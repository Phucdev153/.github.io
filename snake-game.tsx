"use client"

import { useState, useEffect, useRef } from "react"

const GRID_SIZE = 15
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 7, y: 7 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const INITIAL_FOOD = { x: 5, y: 5 }
const GAME_SPEED = 150

type Position = {
  x: number
  y: number
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const gameLoopRef = useRef<number | null>(null)
  const lastRenderTimeRef = useRef<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const directionQueueRef = useRef<Position[]>([])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) directionQueueRef.current.push({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y === 0) directionQueueRef.current.push({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x === 0) directionQueueRef.current.push({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x === 0) directionQueueRef.current.push({ x: 1, y: 0 })
          break
        case " ":
          setIsPaused((prev) => !prev)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [direction])

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return

    const gameLoop = (currentTime: number) => {
      gameLoopRef.current = requestAnimationFrame(gameLoop)

      const secondsSinceLastRender = (currentTime - lastRenderTimeRef.current) / 1000
      if (secondsSinceLastRender < GAME_SPEED / 1000) return

      lastRenderTimeRef.current = currentTime

      updateGame()
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)
    }
  }, [gameOver, isPaused])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    ctx.fillStyle = "#4287f5"
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    })

    // Draw food
    ctx.fillStyle = "#ff3366"
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

    // Draw grid
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }
  }, [snake, food])

  const updateGame = () => {
    // Process direction queue
    if (directionQueueRef.current.length > 0) {
      setDirection(directionQueueRef.current.shift()!)
    }

    // Move snake
    const newSnake = [...snake]
    const head = { ...newSnake[0] }

    head.x += direction.x
    head.y += direction.y

    // Check for collisions
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true)
      return
    }

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      // Generate new food
      let newFood
      do {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        }
      } while (newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))

      setFood(newFood)
      setScore((prev) => prev + 10)

      // Don't remove tail when eating food
    } else {
      // Remove tail
      newSnake.pop()
    }

    // Add new head
    newSnake.unshift(head)
    setSnake(newSnake)
  }

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(INITIAL_FOOD)
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
    directionQueueRef.current = []
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 flex justify-between w-full">
        <div className="text-white">Điểm: {score}</div>
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="px-2 py-1 bg-blue-900/50 hover:bg-blue-900/80 text-white rounded-md text-xs"
        >
          {isPaused ? "Tiếp tục" : "Tạm dừng"}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border border-purple-500"
      />

      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-red-400 mb-2">Game Over! Điểm của bạn: {score}</p>
          <button onClick={resetGame} className="px-4 py-2 bg-blue-900/50 hover:bg-blue-900/80 text-white rounded-md">
            Chơi lại
          </button>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">Sử dụng các phím mũi tên để di chuyển. Nhấn Space để tạm dừng.</div>
    </div>
  )
}
