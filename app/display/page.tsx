"use client"

import { useState, useEffect } from "react"
import { Clock, Timer } from "lucide-react"
import { useTimer } from "@/hooks/use-timer"

export default function DisplayPage() {
  const { timerState, isLoading } = useTimer()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatTime = (ms: number) => {
    if (!mounted || typeof ms !== "number") return "00:00"

    const totalSeconds = Math.floor(Math.abs(ms) / 1000)
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Apenas pulsa quando está nos últimos 30 segundos do countdown
  const shouldPulse = () => {
    if (!mounted || !timerState) return false
    return timerState.mode === "countdown" && timerState.currentTime <= 30000 && timerState.currentTime > 0
  }

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-300 mx-auto mb-4"></div>
          <p className="text-xl md:text-2xl text-gray-600">Conectando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-6xl w-full">
        {/* Header discreto */}
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
          {timerState.mode === "countdown" ? (
            <Timer className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          ) : (
            <Clock className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          )}
          <span className="text-lg md:text-2xl text-gray-400 font-medium">Timer Vila Zelina</span>
        </div>

        {/* Display principal do tempo */}
        <div
          className={`text-6xl sm:text-8xl md:text-[12rem] lg:text-[16rem] font-mono font-bold leading-none text-gray-800 ${
            shouldPulse() ? "animate-pulse" : ""
          }`}
        >
          {formatTime(timerState.currentTime)}
        </div>

        {/* Status mínimo */}
        <div className="mt-6 md:mt-8">
          <div className="text-lg md:text-xl text-gray-500">
            {timerState.mode === "countdown" ? "Tempo Restante" : "Tempo Decorrido"}
          </div>
          {timerState.mode === "countdown" && timerState.currentTime <= 0 && (
            <div className="text-xl md:text-2xl font-bold text-gray-600 mt-2">Tempo Finalizado</div>
          )}
        </div>

        {/* Indicador de conexão discreto */}
        <div className="fixed bottom-4 right-4 opacity-30">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
