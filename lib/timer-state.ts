export interface TimerState {
  duration: number
  currentTime: number
  isRunning: boolean
  mode: "countdown" | "countup"
  lastUpdate: number
  id: string
}

// Estado simples em memória
const state: TimerState = {
  duration: 10 * 60 * 1000, // 10 minutos
  currentTime: 10 * 60 * 1000,
  isRunning: false,
  mode: "countdown",
  lastUpdate: Date.now(),
  id: "1",
}

function updateTime() {
  if (!state.isRunning) return

  const now = Date.now()
  const elapsed = now - state.lastUpdate

  if (state.mode === "countdown") {
    state.currentTime = Math.max(0, state.currentTime - elapsed)
    if (state.currentTime <= 0) {
      state.isRunning = false
      state.currentTime = 0
    }
  } else {
    state.currentTime += elapsed
  }

  state.lastUpdate = now
}

export function getTimerState(): TimerState {
  updateTime()
  return { ...state }
}

export function updateTimerState(updates: Partial<TimerState>): TimerState {
  updateTime()

  // Aplica as mudanças
  Object.assign(state, updates)

  // Atualiza timestamp
  state.lastUpdate = Date.now()
  state.id = Date.now().toString()

  // Lógica especial para mudanças de modo
  if (updates.mode) {
    state.currentTime = updates.mode === "countdown" ? state.duration : 0
    state.isRunning = false
  }

  // Se definir nova duração, reinicia o currentTime
  if (updates.duration !== undefined) {
    state.currentTime = state.mode === "countdown" ? updates.duration : 0
    state.isRunning = false
  }

  return { ...state }
}

export function shouldShowAlert(currentTime: number, alertsShown: string[]): string | null {
  if (currentTime <= 300000 && currentTime > 240000 && !alertsShown.includes("5min")) {
    return "5min"
  }
  if (currentTime <= 60000 && currentTime > 30000 && !alertsShown.includes("1min")) {
    return "1min"
  }
  if (currentTime <= 30000 && currentTime > 10000 && !alertsShown.includes("30s")) {
    return "30s"
  }
  if (currentTime <= 10000 && currentTime > 0 && !alertsShown.includes("10s")) {
    return "10s"
  }
  if (currentTime <= 0 && !alertsShown.includes("finished")) {
    return "finished"
  }
  return null
}
