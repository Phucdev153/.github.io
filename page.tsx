"use client"

import { useState } from "react"
import { SnakeGame } from "@/components/snake-game"
import { RockPaperScissors } from "@/components/rock-paper-scissors"
import { NumberGuessing } from "@/components/number-guessing"
import { MemoryGame } from "@/components/memory-game"
import { FlowGame } from "@/components/flow-game"

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games = [
    { id: "flow", name: "Flow Free", component: FlowGame },
    { id: "snake", name: "Rắn Săn Mồi", component: SnakeGame },
    { id: "rps", name: "Kéo Búa Bao", component: RockPaperScissors },
    { id: "guess", name: "Đoán Số", component: NumberGuessing },
    { id: "memory", name: "Trò Chơi Trí Nhớ", component: MemoryGame },
  ]

  const renderGame = () => {
    if (!selectedGame) return null

    const game = games.find((g) => g.id === selectedGame)
    if (!game) return null

    const GameComponent = game.component
    return <GameComponent />
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Stars background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Mountains */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-64"
        >
          <path
            fill="#0a0a2a"
            fillOpacity="1"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-64 -mt-32"
        >
          <path
            fill="#050518"
            fillOpacity="1"
            d="M0,160L80,176C160,192,320,224,480,229.3C640,235,800,213,960,202.7C1120,192,1280,192,1360,192L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>\
