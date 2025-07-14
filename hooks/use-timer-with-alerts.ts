"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { shouldShowAlert } from "@/lib/timer-state"

interface TimerState {
  duration: number
  currentTime: number
  isRunning: boolean
  mode: "countdown" | "countup"
  lastUpdate: number
  id: string
  alertsShown: string[]
}

export function useTimerWithAlerts() {
  const [timerState, setTimerState] = useState<TimerState>({
    duration: 0,
    currentTime: 0,
    isRunning: false,
    mode: "countdown",
    lastUpdate: Date.now(),
    id: "",
    alertsShown: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentAlert, setCurrentAlert] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Inicializa o áudio
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = 0.7
  }, [])

  // Função para tocar som de alerta
  const playAlert = useCallback((type: string) => {
    if (!audioRef.current) return

    // Frequências diferentes para cada tipo de alerta
    const frequencies: { [key: string]: number } = {
      "5min": 800,
      "1min": 1000,
      "30s": 1200,
      "10s": 1400,
      finished: 600,
    }

    // Cria um beep usando Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequencies[type] || 1000
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)

    // Para o alerta 'finished', toca 3 beeps
    if (type === "finished") {
      setTimeout(() => playAlert("finished-2"), 200)
      setTimeout(() => playAlert("finished-3"), 400)
    }
  }, [])

  // Função para buscar o estado atual
  const fetchTimerState = useCallback(async () => {
    try {
      const response = await fetch("/api/timer")
      if (!response.ok) throw new Error("Erro ao buscar estado")
      const data = await response.json()

      // Verifica se deve mostrar alerta
      if (data.mode === "countdown") {
        const alertType = shouldShowAlert(data.currentTime, data.alertsShown || [])
        if (alertType) {
          setCurrentAlert(alertType)
          playAlert(alertType)

          // Marca o alerta como mostrado
          await sendAction("addAlert", { alert: alertType })
        }
      }

      setTimerState(data)
      setError(null)
    } catch (err) {
      console.error("Erro ao buscar timer:", err)
      setError("Erro de conexão")
    } finally {
      setIsLoading(false)
    }
  }, [playAlert])

  // Função para enviar ações
  const sendAction = useCallback(async (action: string, data?: any) => {
    try {
      setError(null)
      const response = await fetch("/api/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...data }),
      })

      if (!response.ok) throw new Error("Erro ao enviar ação")

      const newState = await response.json()
      setTimerState(newState)
    } catch (err) {
      console.error("Erro ao enviar ação:", err)
      setError("Erro ao executar ação")
    }
  }, [])

  // Polling para sincronização
  useEffect(() => {
    fetchTimerState()
    const interval = setInterval(fetchTimerState, 200) // Mais frequente para alertas
    return () => clearInterval(interval)
  }, [fetchTimerState])

  // Remove alerta após 3 segundos
  useEffect(() => {
    if (currentAlert) {
      const timeout = setTimeout(() => setCurrentAlert(null), 3000)
      return () => clearTimeout(timeout)
    }
  }, [currentAlert])

  return {
    timerState,
    isLoading,
    error,
    sendAction,
    refresh: fetchTimerState,
    currentAlert,
  }
}
