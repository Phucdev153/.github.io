"use client"

import { useState, useEffect } from "react"

const choices = [
  { id: "rock", name: "Đá", emoji: "✊", beats: "scissors" },
  { id: "paper", name: "Giấy", emoji: "✋", beats: "rock" },
  { id: "scissors", name: "Kéo", emoji: "✌️", beats: "paper" },
]

export function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null)
  const [computerChoice, setComputerChoice] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [countdown, setCountdown] = useState<number | null>(null)
  const [gameHistory, setGameHistory] = useState<Array<{ player: string; computer: string; result: string }>>([])

  const makeChoice = (choice: string) => {
    setPlayerChoice(choice)
    setCountdown(3)
  }

  useEffect(() => {
    if (countdown === null) return

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 500)
      return () => clearTimeout(timer)
    }

    if (countdown === 0) {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)].id
      setComputerChoice(randomChoice)

      // Determine winner
      const playerObject = choices.find((c) => c.id === playerChoice)
      const computerObject = choices.find((c) => c.id === randomChoice)

      let gameResult
      if (playerChoice === randomChoice) {
        gameResult = "Hòa"
      } else if (playerObject?.beats === randomChoice) {
        gameResult = "Bạn thắng!"
        setScore((prev) => ({ ...prev, player: prev.player + 1 }))
      } else {
        gameResult = "Máy thắng!"
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }))
      }

      setResult(gameResult)
      setGameHistory((prev) =>
        [
          ...prev,
          {
            player: playerChoice || "",
            computer: randomChoice,
            result: gameResult,
          },
        ].slice(-5),
      )

      // Reset after 2 seconds
      const timer = setTimeout(() => {
        setPlayerChoice(null)
        setComputerChoice(null)
        setResult(null)
        setCountdown(null)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [countdown, playerChoice])

  const resetGame = () => {
    setScore({ player: 0, computer: 0 })
    setGameHistory([])
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setCountdown(null)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full">
        <div className="text-white">Bạn: {score.player}</div>
        <div className="text-white">Máy: {score.computer}</div>
      </div>

      <div className="flex justify-center items-center h-24 mb-4">
        {countdown !== null ? (
          <div className="text-center">
            <div className="text-4xl text-yellow-400 mb-2">
              {countdown > 0 ? (
                countdown
              ) : (
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-5xl mb-1">{choices.find((c) => c.id === playerChoice)?.emoji}</div>
                    <div className="text-sm text-blue-400">Bạn</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl mb-1">{choices.find((c) => c.id === computerChoice)?.emoji}</div>
                    <div className="text-sm text-red-400">Máy</div>
                  </div>
                </div>
              )}
            </div>
            {countdown === 0 && (
              <div
                className={`text-xl font-bold ${
                  result === "Bạn thắng!"
                    ? "text-green-400"
                    : result === "Máy thắng!"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {result}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-white">Chọn một trong các lựa chọn bên dưới</div>
        )}
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => makeChoice(choice.id)}
            disabled={countdown !== null}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center text-2xl
              ${countdown === null ? "hover:bg-purple-900/50" : "opacity-70"}
              ${playerChoice === choice.id ? "bg-blue-900/70" : "bg-purple-900/30"}
              transition-colors
            `}
          >
            {choice.emoji}
          </button>
        ))}
      </div>

      {gameHistory.length > 0 && (
        <div className="mt-4 w-full">
          <h4 className="text-sm text-gray-400 mb-2">Lịch sử</h4>
          <div className="text-xs space-y-1">
            {gameHistory.map((game, index) => (
              <div key={index} className="flex justify-between text-gray-300">
                <span>
                  {choices.find((c) => c.id === game.player)?.emoji} vs{" "}
                  {choices.find((c) => c.id === game.computer)?.emoji}
                </span>
                <span
                  className={`
                  ${
                    game.result === "Bạn thắng!"
                      ? "text-green-400"
                      : game.result === "Máy thắng!"
                        ? "text-red-400"
                        : "text-yellow-400"
                  }
                `}
                >
                  {game.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={resetGame}
        className="mt-4 px-3 py-1 bg-red-900/50 hover:bg-red-900/80 text-white rounded-md text-sm"
      >
        Đặt lại
      </button>
    </div>
  )
}
