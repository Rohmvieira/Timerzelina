"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Clock, Timer, Wifi, AlertCircle } from "lucide-react"
import { useTimer } from "@/hooks/use-timer"

export default function ControlPage() {
  const { timerState, isLoading, error, sendAction } = useTimer()
  const [minutes, setMinutes] = useState(10)
  const [seconds, setSeconds] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSetDuration = () => {
    const totalMs = (minutes * 60 + seconds) * 1000
    sendAction("setDuration", { duration: totalMs })
  }

  const formatTime = (ms: number) => {
    if (!mounted || typeof ms !== "number") return "00:00"

    const totalSeconds = Math.floor(Math.abs(ms) / 1000)
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const shouldPulse = () => {
    if (!mounted || !timerState) return false
    return timerState.mode === "countdown" && timerState.currentTime <= 30000 && timerState.currentTime > 0
  }

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Timer Vila Zelina - Mesa de Som
              <div className="ml-auto flex items-center gap-2 text-sm text-green-600">
                <Wifi className="w-4 h-4" />
                Online
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Display do Timer */}
            <div className="text-center">
              <div className={`text-8xl font-mono font-bold text-blue-600 ${shouldPulse() ? "animate-pulse" : ""}`}>
                {formatTime(timerState.currentTime)}
              </div>
              <div className="text-lg text-gray-600 mt-2">
                Modo: {timerState.mode === "countdown" ? "Regressivo" : "Progressivo"}
                {timerState.isRunning && (
                  <span className="ml-2 inline-flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                    Rodando
                  </span>
                )}
              </div>
              {timerState.mode === "countdown" && timerState.currentTime <= 0 && (
                <div className="text-xl font-bold text-red-600 mt-2">FINALIZADO!</div>
              )}
            </div>

            {/* Configurações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Definir Tempo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Minutos</label>
                      <Input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(Math.max(0, Number(e.target.value) || 0))}
                        min="0"
                        max="60"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Segundos</label>
                      <Input
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value) || 0)))}
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSetDuration} className="w-full">
                    Aplicar Tempo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Modo</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={timerState.mode} onValueChange={(value) => sendAction("setMode", { mode: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="countdown">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4" />
                          Regressivo
                        </div>
                      </SelectItem>
                      <SelectItem value="countup">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Progressivo
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Controles Principais */}
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => sendAction(timerState.isRunning ? "pause" : "start")} className="px-8">
                {timerState.isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline" onClick={() => sendAction("reset")} className="px-8">
                <RotateCcw className="w-5 h-5 mr-2" />
                Zerar
              </Button>
            </div>

            {/* Info da Tribuna */}
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Link para a tribuna:</strong>
                  </p>
                  <p className="text-sm bg-white px-3 py-2 rounded border font-mono">
                    {mounted ? window.location.origin : ""}/display
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Abra este link no tablet da tribuna</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
