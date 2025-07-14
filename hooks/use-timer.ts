"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface TimerState {
  duration: number
  currentTime: number
  isRunning: boolean
  mode: "countdown" | "countup"
  lastUpdate: number
  id: string
}

export function useTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    duration: 600000, // 10 min padrão
    currentTime: 600000,
    isRunning: false,
    mode: "countdown",
    lastUpdate: Date.now(),
    id: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(false)

  // Função para buscar o estado atual
  const fetchTimerState = useCallback(async () => {
    if (!mountedRef.current) return

    try {
      const response = await fetch("/api/timer")
      if (!response.ok) throw new Error("Erro na conexão")

      const data = await response.json()

      // Só atualiza se o componente ainda estiver montado
      if (mountedRef.current) {
        setTimerState(data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError("Erro de conexão")
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [])

  // Função para enviar ações
  const sendAction = useCallback(async (action: string, data?: any) => {
    if (!mountedRef.current) return

    try {
      setError(null)
      const response = await fetch("/api/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...data }),
      })

      if (!response.ok) throw new Error("Erro ao executar ação")

      const newState = await response.json()

      if (mountedRef.current) {
        setTimerState(newState)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError("Erro ao executar ação")
      }
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true

    // Busca inicial
    fetchTimerState()

    // Intervalo mais longo para evitar sobrecarga
    intervalRef.current = setInterval(() => {
      if (mountedRef.current) {
        fetchTimerState()
      }
    }, 2000) // 2 segundos

    return () => {
      mountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchTimerState])

  return {
    timerState,
    isLoading,
    error,
    sendAction,
  }
}
