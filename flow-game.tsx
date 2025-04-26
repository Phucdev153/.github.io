"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, RotateCcw, Lightbulb } from "lucide-react"

type Point = {
  x: number
  y: number
}

type Dot = {
  id: number
  color: string
  position: Point
  isEndpoint: boolean
  pairId: number
}

type Path = {
  id: number
  color: string
  points: Point[]
  completed: boolean
}

type GameMode = "easy" | "hard" | "impossible"

const COLORS = [
  "#ff3333", // red
  "#33cc33", // green
  "#3366ff", // blue
  "#ffcc00", // yellow
  "#ff9900", // orange
  "#9933cc", // purple
  "#00cccc", // cyan
  "#ffffff", // white
  "#ff66cc", // pink
]

export function FlowGame() {
  const [gameMode, setGameMode] = useState<GameMode>("easy")
  const [level, setLevel] = useState(1)
  const [gridSize, setGridSize] = useState(5)
  const [dots, setDots] = useState<Dot[]>([])
  const [paths, setPaths] = useState<Path[]>([])
  const [activePath, setActivePath] = useState<Path | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState<Point | null>(null)
  const [cellSize, setCellSize] = useState(40)
  const [gameStartTime, setGameStartTime] = useState<number>(0)
  const [gameTime, setGameTime] = useState(0)
  const [showImpossibleMessage, setShowImpossibleMessage] = useState(false)

  // Initialize game
  useEffect(() => {
    if (!showMenu) {
      generateLevel()
      setGameStartTime(Date.now())
      const timer = setInterval(() => {
        setGameTime(Math.floor((Date.now() - gameStartTime) / 1000))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showMenu, level, gameMode])

  // Draw game
  useEffect(() => {
    if (showMenu) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Calculate cell size based on grid size and canvas size
    const minDimension = Math.min(canvas.width, canvas.height)
    const newCellSize = Math.floor(minDimension / gridSize)
    setCellSize(newCellSize)

    // Clear canvas
    ctx.fillStyle = "#1e2430"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#2c3e50"
    ctx.lineWidth = 1

    for (let i = 0; i <= gridSize; i++) {
      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, gridSize * cellSize)
      ctx.stroke()

      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(gridSize * cellSize, i * cellSize)
      ctx.stroke()
    }

    // Draw completed paths
    paths.forEach((path) => {
      if (path.points.length > 1) {
        drawPath(ctx, path)
      }
    })

    // Draw active path
    if (activePath && activePath.points.length > 0) {
      drawPath(ctx, activePath)

      // Draw line to mouse position if available
      if (mousePos && activePath.points.length > 0) {
        const lastPoint = activePath.points[activePath.points.length - 1]
        ctx.beginPath()
        ctx.strokeStyle = activePath.color
        ctx.lineWidth = cellSize * 0.4
        ctx.moveTo(lastPoint.x * cellSize + cellSize / 2, lastPoint.y * cellSize + cellSize / 2)
        ctx.lineTo(mousePos.x * cellSize + cellSize / 2, mousePos.y * cellSize + cellSize / 2)
        ctx.stroke()
      }
    }

    // Draw dots
    dots.forEach((dot) => {
      ctx.beginPath()
      ctx.fillStyle = dot.color
      ctx.arc(
        dot.position.x * cellSize + cellSize / 2,
        dot.position.y * cellSize + cellSize / 2,
        cellSize * 0.3,
        0,
        Math.PI * 2,
      )
      ctx.fill()
    })

    // Check if level is complete
    if (paths.every((path) => path.completed) && paths.length > 0) {
      setIsComplete(true)
    }
  }, [dots, paths, activePath, mousePos, showMenu, gridSize, cellSize])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      // Set canvas size to be square and fit the container
      const container = canvas.parentElement
      if (!container) return

      const size = Math.min(container.clientWidth, 400)
      canvas.width = size
      canvas.height = size
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const drawPath = (ctx: CanvasRenderingContext2D, path: Path) => {
    if (path.points.length < 2) return

    ctx.beginPath()
    ctx.strokeStyle = path.color
    ctx.lineWidth = cellSize * 0.4
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    const startPoint = path.points[0]
    ctx.moveTo(startPoint.x * cellSize + cellSize / 2, startPoint.y * cellSize + cellSize / 2)

    for (let i = 1; i < path.points.length; i++) {
      const point = path.points[i]
      ctx.lineTo(point.x * cellSize + cellSize / 2, point.y * cellSize + cellSize / 2)
    }

    ctx.stroke()
  }

  const generateLevel = () => {
    // Determine grid size based on level and game mode
    let newGridSize = 5
    let pairsCount = 4

    if (gameMode === "easy") {
      newGridSize = Math.min(5 + Math.floor(level / 10), 8)
      pairsCount = Math.min(3 + Math.floor(level / 5), 7)
    } else if (gameMode === "hard") {
      newGridSize = Math.min(6 + Math.floor(level / 8), 10)
      pairsCount = Math.min(4 + Math.floor(level / 4), 9)
    } else {
      // Impossible mode
      newGridSize = Math.min(5 + Math.floor(level / 6), 9)
      pairsCount = Math.min(4 + Math.floor(level / 3), 9)
    }

    setGridSize(newGridSize)

    // Generate pairs of dots
    const newDots: Dot[] = []
    const newPaths: Path[] = []

    // Limit pairs to available colors
    pairsCount = Math.min(pairsCount, COLORS.length)

    for (let i = 0; i < pairsCount; i++) {
      const color = COLORS[i]

      // Generate first dot
      const dot1: Point = {
        x: Math.floor(Math.random() * newGridSize),
        y: Math.floor(Math.random() * newGridSize),
      }

      // Make sure dots don't overlap
      while (newDots.some((d) => d.position.x === dot1.x && d.position.y === dot1.y)) {
        dot1.x = Math.floor(Math.random() * newGridSize)
        dot1.y = Math.floor(Math.random() * newGridSize)
      }

      // Add first dot
      newDots.push({
        id: i * 2,
        color,
        position: dot1,
        isEndpoint: true,
        pairId: i,
      })

      // Generate second dot
      let dot2: Point

      if (gameMode === "impossible" && level > 3 && Math.random() < 0.7) {
        // In impossible mode, sometimes create unsolvable puzzles
        // by placing dots in positions that can't be connected
        dot2 = generateImpossibleDot(newGridSize, newDots, dot1)
      } else {
        // Generate a dot that can be connected to the first one
        dot2 = generateConnectableDot(newGridSize, newDots, dot1)
      }

      // Add second dot
      newDots.push({
        id: i * 2 + 1,
        color,
        position: dot2,
        isEndpoint: true,
        pairId: i,
      })

      // Create empty path for this pair
      newPaths.push({
        id: i,
        color,
        points: [],
        completed: false,
      })
    }

    setDots(newDots)
    setPaths(newPaths)
    setActivePath(null)
    setIsComplete(false)
    setShowHint(false)
    setAttempts(0)
  }

  const generateConnectableDot = (gridSize: number, existingDots: Dot[], firstDot: Point): Point => {
    // Try to generate a dot that can be connected to the first one
    let attempts = 0
    let dot: Point

    do {
      // Start with a random position
      dot = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      }

      // Make sure it's not too close or too far from the first dot
      const distance = Math.abs(dot.x - firstDot.x) + Math.abs(dot.y - firstDot.y)

      // Try again if it's too close, too far, or overlaps with existing dots
      if (
        distance < 2 ||
        distance > gridSize * 1.5 ||
        existingDots.some((d) => d.position.x === dot.x && d.position.y === dot.y)
      ) {
        attempts++
        continue
      }

      break
    } while (attempts < 100)

    // If we couldn't find a good position, just use a random one
    if (attempts >= 100) {
      do {
        dot = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        }
      } while (existingDots.some((d) => d.position.x === dot.x && d.position.y === dot.y))
    }

    return dot
  }

  const generateImpossibleDot = (gridSize: number, existingDots: Dot[], firstDot: Point): Point => {
    // Generate a dot that will be difficult or impossible to connect
    let dot: Point

    // Place the dot in a way that forces crossing paths
    const existingPairs = Math.floor(existingDots.length / 2)

    if (existingPairs > 0 && Math.random() < 0.8) {
      // Try to place the dot so that it forces crossing an existing pair
      const pairIndex = Math.floor(Math.random() * existingPairs)
      const dot1 = existingDots[pairIndex * 2].position
      const dot2 = existingDots[pairIndex * 2 + 1].position

      // Place the new dot on the opposite side of the existing pair
      if (Math.random() < 0.5) {
        dot = {
          x: firstDot.x < dot1.x ? dot1.x + 1 : dot1.x - 1,
          y: firstDot.y < dot1.y ? dot1.y + 1 : dot1.y - 1,
        }
      } else {
        dot = {
          x: firstDot.x < dot2.x ? dot2.x + 1 : dot2.x - 1,
          y: firstDot.y < dot2.y ? dot2.y + 1 : dot2.y - 1,
        }
      }

      // Make sure it's within the grid
      dot.x = Math.max(0, Math.min(gridSize - 1, dot.x))
      dot.y = Math.max(0, Math.min(gridSize - 1, dot.y))
    } else {
      // Place the dot far away in a corner
      dot = {
        x: firstDot.x < gridSize / 2 ? gridSize - 1 : 0,
        y: firstDot.y < gridSize / 2 ? gridSize - 1 : 0,
      }
    }

    // Make sure it doesn't overlap with existing dots
    while (existingDots.some((d) => d.position.x === dot.x && d.position.y === dot.y)) {
      dot.x = (dot.x + 1) % gridSize
      dot.y = (dot.y + 1) % gridSize
    }

    return dot
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isComplete) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / cellSize)
    const y = Math.floor((e.clientY - rect.top) / cellSize)

    // Check if clicked on a dot
    const clickedDot = dots.find((dot) => dot.position.x === x && dot.position.y === y)

    if (clickedDot) {
      // If clicked on a dot, start or end a path
      const pathIndex = paths.findIndex((p) => p.id === clickedDot.pairId)

      if (pathIndex === -1) return

      const newPaths = [...paths]

      // If this is the start of a new path
      if (!activePath || activePath.id !== clickedDot.pairId) {
        // Clear existing path if any
        newPaths[pathIndex].points = [{ x, y }]
        newPaths[pathIndex].completed = false
        setActivePath(newPaths[pathIndex])
      }
      // If this is the end of the current path
      else if (
        activePath.id === clickedDot.pairId &&
        activePath.points.length > 0 &&
        (activePath.points[0].x !== x || activePath.points[0].y !== y)
      ) {
        // Complete the path
        newPaths[pathIndex].completed = true
        setActivePath(null)
      }

      setPaths(newPaths)
      return
    }

    // If not clicked on a dot, continue the active path
    if (activePath && activePath.points.length > 0) {
      const lastPoint = activePath.points[activePath.points.length - 1]

      // Check if the new point is adjacent to the last point
      const isAdjacent =
        (Math.abs(x - lastPoint.x) === 1 && y === lastPoint.y) || (Math.abs(y - lastPoint.y) === 1 && x === lastPoint.x)

      if (!isAdjacent) return

      // Check if the cell is empty (no dots or other paths)
      const isDotOccupied = dots.some((dot) => dot.position.x === x && dot.position.y === y)

      if (isDotOccupied) return

      // Check if the cell is already in the current path
      const isInCurrentPath = activePath.points.some((p) => p.x === x && p.y === y)

      if (isInCurrentPath) {
        // If going back, remove points after the found point
        const pointIndex = activePath.points.findIndex((p) => p.x === x && p.y === y)
        if (pointIndex !== -1) {
          const newPaths = [...paths]
          const pathIndex = newPaths.findIndex((p) => p.id === activePath.id)
          newPaths[pathIndex].points = activePath.points.slice(0, pointIndex + 1)
          setPaths(newPaths)
          setActivePath(newPaths[pathIndex])
          return
        }
      }

      // Check if the cell is in another path
      const isInOtherPath = paths.some(
        (path) => path.id !== activePath.id && path.points.some((p) => p.x === x && p.y === y),
      )

      if (isInOtherPath) {
        // Clear the other path
        const otherPathIndex = paths.findIndex(
          (path) => path.id !== activePath.id && path.points.some((p) => p.x === x && p.y === y),
        )

        if (otherPathIndex !== -1) {
          const newPaths = [...paths]
          newPaths[otherPathIndex].points = []
          newPaths[otherPathIndex].completed = false
          setPaths(newPaths)
        }
      }

      // Add the new point to the path
      const newPaths = [...paths]
      const pathIndex = newPaths.findIndex((p) => p.id === activePath.id)
      newPaths[pathIndex].points = [...activePath.points, { x, y }]
      setPaths(newPaths)
      setActivePath(newPaths[pathIndex])
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activePath || isComplete) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / cellSize)
    const y = Math.floor((e.clientY - rect.top) / cellSize)

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      setMousePos({ x, y })
    } else {
      setMousePos(null)
    }
  }

  const handleCanvasMouseLeave = () => {
    setMousePos(null)
  }

  const nextLevel = () => {
    setLevel(level + 1)
    setIsComplete(false)
    generateLevel()
  }

  const resetLevel = () => {
    setAttempts(attempts + 1)

    // In impossible mode, after several attempts, show a message
    if (gameMode === "impossible" && attempts >= 3) {
      setShowImpossibleMessage(true)
      setTimeout(() => {
        setShowImpossibleMessage(false)
      }, 3000)
    }

    const newPaths = paths.map((path) => ({
      ...path,
      points: [],
      completed: false,
    }))

    setPaths(newPaths)
    setActivePath(null)
    setIsComplete(false)
  }

  const showHintHandler = () => {
    setShowHint(true)
    setTimeout(() => {
      setShowHint(false)
    }, 2000)
  }

  const startGame = (mode: GameMode) => {
    setGameMode(mode)
    setLevel(1)
    setShowMenu(false)
  }

  const backToMenu = () => {
    setShowMenu(true)
  }

  return (
    <div className="flex flex-col items-center w-full">
      {showMenu ? (
        <div className="w-full max-w-md bg-[#1e2430] rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Flow Free</h2>
          <p className="text-gray-300 mb-8">Nối các điểm cùng màu mà không để đường đi chồng lên nhau</p>

          <div className="space-y-4">
            <button
              onClick={() => startGame("easy")}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Dễ
            </button>
            <button
              onClick={() => startGame("hard")}
              className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              Khó
            </button>
            <button
              onClick={() => startGame("impossible")}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Không Thể Thắng
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-md bg-[#1e2430] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={backToMenu}
                className="w-12 h-12 flex items-center justify-center bg-[#2c3e50] rounded-full"
              >
                <ChevronLeft className="text-white" />
              </button>

              <div className="text-center">
                <div className="text-white font-bold">
                  {gameMode === "easy" ? "DỄ" : gameMode === "hard" ? "KHÓ" : "KHÔNG THỂ THẮNG"}
                </div>
                <div className="text-2xl text-white font-bold">Level {level}</div>
              </div>

              <button
                onClick={resetLevel}
                className="w-12 h-12 flex items-center justify-center bg-[#2c3e50] rounded-full"
              >
                <RotateCcw className="text-white" />
              </button>
            </div>

            <div className="relative flex justify-center mb-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
                className="border border-[#2c3e50] rounded-lg touch-none"
              />

              {isComplete && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg">
                  <div className="text-2xl text-white font-bold mb-2">Hoàn thành!</div>
                  <div className="text-gray-300 mb-4">Thời gian: {gameTime}s</div>
                  <button
                    onClick={nextLevel}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Cấp độ tiếp theo
                  </button>
                </div>
              )}

              {showHint && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                  <div className="text-xl text-white text-center p-4">
                    {gameMode === "impossible"
                      ? "Cấp độ này có thể không có giải pháp!"
                      : "Hãy thử nối các điểm cùng màu mà không để đường đi chồng lên nhau!"}
                  </div>
                </div>
              )}

              {showImpossibleMessage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                  <div className="text-xl text-red-400 text-center p-4">
                    Cấp độ này được thiết kế để không thể giải quyết!
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={showHintHandler}
                className="w-12 h-12 flex items-center justify-center bg-pink-600 rounded-full"
              >
                <Lightbulb className="text-white" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            {gameMode === "impossible"
              ? "Chế độ này được thiết kế để không thể thắng. Thử thách bản thân!"
              : "Nối tất cả các điểm cùng màu mà không để đường đi chồng lên nhau."}
          </div>
        </>
      )}
    </div>
  )
}
