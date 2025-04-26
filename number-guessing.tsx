"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function NumberGuessing() {
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [guess, setGuess] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [attempts, setAttempts] = useState<number>(0)
  const [maxAttempts, setMaxAttempts] = useState<number>(10)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [gameWon, setGameWon] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState<string>("medium")
  const [range, setRange] = useState<{ min: number; max: number }>({ min: 1, max: 100 })
  const [history, setHistory] = useState<Array<{ guess: number; hint: string }>>([])

  useEffect(() => {
    startNewGame()
  }, [difficulty])

  const startNewGame = () => {
    const min = 1
    let max = 100
    let attempts = 10

    switch (difficulty) {
      case "easy":
        max = 50
        attempts = 10
        break
      case "medium":
        max = 100
        attempts = 7
        break
      case "hard":
        max = 200
        attempts = 7
        break
      case "expert":
        max = 500
        attempts = 9
        break
    }

    setRange({ min, max })
    setTargetNumber(Math.floor(Math.random() * (max - min + 1)) + min)
    setGuess("")
    setMessage(`Hãy đoán một số từ ${min} đến ${max}`)
    setAttempts(0)
    setMaxAttempts(attempts)
    setGameOver(false)
    setGameWon(false)
    setHistory([])
  }

  const handleGuess = () => {
    const guessNumber = Number.parseInt(guess)

    if (isNaN(guessNumber)) {
      setMessage("Vui lòng nhập một số hợp lệ!")
      return
    }

    if (guessNumber < range.min || guessNumber > range.max) {
      setMessage(`Vui lòng nhập một số từ ${range.min} đến ${range.max}!`)
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    let hint = ""
    if (guessNumber === targetNumber) {
      setMessage(`Chúc mừng! Bạn đã đoán đúng số ${targetNumber} sau ${newAttempts} lần thử!`)
      setGameOver(true)
      setGameWon(true)
      hint = "Chính xác!"
    } else {
      const diff = Math.abs(targetNumber - guessNumber)
      let hintText = ""

      if (guessNumber < targetNumber) {
        hintText = "Lớn hơn"
        if (diff <= 5) hintText += " (rất gần)"
        else if (diff <= 15) hintText += " (gần)"
      } else {
        hintText = "Nhỏ hơn"
        if (diff <= 5) hintText += " (rất gần)"
        else if (diff <= 15) hintText += " (gần)"
      }

      hint = hintText
      setMessage(`${hintText}. Còn ${maxAttempts - newAttempts} lần thử.`)

      if (newAttempts >= maxAttempts) {
        setMessage(`Game over! Số cần đoán là ${targetNumber}.`)
        setGameOver(true)
      }
    }

    setHistory((prev) => [...prev, { guess: guessNumber, hint }])
    setGuess("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameOver) {
      handleGuess()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full">
        <div className="flex justify-between">
          <div className="text-white">
            Lần thử: {attempts}/{maxAttempts}
          </div>
          <div className="text-white">
            Phạm vi: {range.min}-{range.max}
          </div>
        </div>
      </div>

      <div className="mb-4 text-center">
        <p className={`text-lg ${gameWon ? "text-green-400" : gameOver ? "text-red-400" : "text-blue-400"}`}>
          {message}
        </p>
      </div>

      <div className="flex w-full mb-4">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={gameOver}
          min={range.min}
          max={range.max}
          placeholder="Nhập số của bạn"
          className="flex-1 bg-purple-900/30 border border-purple-500 rounded-l px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleGuess}
          disabled={gameOver}
          className="bg-blue-900/50 hover:bg-blue-900/80 text-white px-4 py-2 rounded-r transition-colors disabled:opacity-50"
        >
          Đoán
        </button>
      </div>

      {history.length > 0 && (
        <div className="w-full mb-4">
          <h4 className="text-sm text-gray-400 mb-2">Lịch sử đoán</h4>
          <div className="max-h-32 overflow-y-auto text-sm space-y-1">
            {history.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-300">
                <span>
                  #{attempts - index}: {item.guess}
                </span>
                <span
                  className={`
                  ${
                    item.hint === "Chính xác!"
                      ? "text-green-400"
                      : item.hint.includes("rất gần")
                        ? "text-yellow-400"
                        : "text-blue-400"
                  }
                `}
                >
                  {item.hint}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Độ khó</h4>
        <div className="flex space-x-2">
          {["easy", "medium", "hard", "expert"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`
                px-2 py-1 rounded text-xs
                ${difficulty === level ? "bg-blue-900 text-white" : "bg-purple-900/30 text-gray-300"}
              `}
            >
              {level === "easy" ? "Dễ" : level === "medium" ? "Trung bình" : level === "hard" ? "Khó" : "Chuyên gia"}
            </button>
          ))}
        </div>
      </div>

      <button onClick={startNewGame} className="px-4 py-2 bg-green-900/50 hover:bg-green-900/80 text-white rounded-md">
        {gameOver ? "Chơi lại" : "Trò chơi mới"}
      </button>
    </div>
  )
}
