"use client"

import type React from "react"

import { useState } from "react"
import { FlowGame } from "./flow-game"

type Game = {
  id: string
  name: string
  component: React.ComponentType<any>
}

type GameSelectorProps = {
  games: Game[]
  onSelect: (gameId: string) => void
}

export function GameSelector({ games, onSelect }: GameSelectorProps) {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  // Add Flow Game to the games list
  const allGames = [...games, { id: "flow", name: "Flow Free", component: FlowGame }]

  return (
    <div className="grid grid-cols-2 gap-4">
      {allGames.map((game) => (
        <button
          key={game.id}
          className={`
            relative h-32 rounded-lg border border-purple-500 overflow-hidden transition-all duration-300
            ${hoveredGame === game.id ? "scale-105 border-blue-400" : "scale-100"}
          `}
          onClick={() => onSelect(game.id)}
          onMouseEnter={() => setHoveredGame(game.id)}
          onMouseLeave={() => setHoveredGame(null)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 hover:from-purple-800/50 hover:to-blue-700/50 transition-colors" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-2">
            <div className="text-white font-medium text-center">{game.name}</div>
            <div className="mt-2 text-xs text-blue-300">Nhấn để chơi</div>
          </div>
        </button>
      ))}
    </div>
  )
}
