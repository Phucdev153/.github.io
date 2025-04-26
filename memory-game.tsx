"use client"

import { useState, useEffect } from "react"

type Card = {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")

  const emojis = [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🐧",
    "🐦",
    "🦆",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
  ]

  useEffect(() => {
    startNewGame()
  }, [difficulty])

  const startNewGame = () => {
    let pairsCount = 6

    switch (difficulty) {
      case "easy":
        pairsCount = 6
        break
      case "medium":
        pairsCount = 8
        break
      case "hard":
        pairsCount = 12
        break
    }

    // Create pairs of cards
    const selectedEmojis = emojis.slice(0, pairsCount)
    const cardPairs = [...selectedEmojis, ...selectedEmojis]

    // Shuffle cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setGameOver(false)
  }

  const handleCardClick = (id: number) => {
    // Ignore if already flipped or matched
    if (cards[id].flipped || cards[id].matched) return

    // Ignore if two cards are already flipped
    if (flippedCards.length === 2) return

    // Flip the card
    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = newCards[firstId]
      const secondCard = newCards[secondId]

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        newCards[firstId].matched = true
        newCards[secondId].matched = true
        setCards(newCards)
        setFlippedCards([])

        // Check if game is over
        if (newCards.every((card) => card.matched)) {
          setGameOver(true)
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          newCards[firstId].flipped = false
          newCards[secondId].flipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full flex justify-between">
        <div className="text-white">Lượt: {moves}</div>
        <div className="text-white">{gameOver ? "Hoàn thành!" : "Tìm các cặp giống nhau"}</div>
      </div>

      <div
        className={`grid gap-2 mb-4 ${
          difficulty === "easy" ? "grid-cols-4" : difficulty === "medium" ? "grid-cols-4" : "grid-cols-6"
        }`}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              w-12 h-12 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300
              ${card.flipped || card.matched ? "bg-purple-900/70" : "bg-blue-900/30"}
              ${card.matched ? "border-2 border-green-500" : "border border-purple-500"}
              hover:bg-purple-900/50
            `}
          >
            {(card.flipped || card.matched) && <span className="text-xl">{card.emoji}</span>}
          </div>
        ))}
      </div>

      <div className="w-full mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Độ khó</h4>
        <div className="flex space-x-2">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level as "easy" | "medium" | "hard")}
              className={`
                px-2 py-1 rounded text-xs
                ${difficulty === level ? "bg-blue-900 text-white" : "bg-purple-900/30 text-gray-300"}
              `}
            >
              {level === "easy" ? "Dễ" : level === "medium" ? "Trung bình" : "Khó"}
            </button>
          ))}
        </div>
      </div>

      <button onClick={startNewGame} className="px-4 py-2 bg-green-900/50 hover:bg-green-900/80 text-white rounded-md">
        Trò chơi mới
      </button>
    </div>
  )
}
