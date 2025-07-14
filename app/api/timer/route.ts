import { type NextRequest, NextResponse } from "next/server"
import { getTimerState, updateTimerState } from "@/lib/timer-state"

export async function GET() {
  try {
    const state = getTimerState()

    // Validação básica antes de retornar
    if (typeof state.currentTime !== "number" || typeof state.duration !== "number") {
      throw new Error("Estado inválido do timer")
    }

    return NextResponse.json(state, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Erro ao buscar estado do timer:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Ação recebida:", body.action)

    if (!body.action || typeof body.action !== "string") {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 })
    }

    let newState

    switch (body.action) {
      case "start":
        newState = updateTimerState({ isRunning: true })
        break

      case "pause":
        newState = updateTimerState({ isRunning: false })
        break

      case "reset":
        const currentState = getTimerState()
        const resetTime = currentState.mode === "countdown" ? currentState.duration : 0
        newState = updateTimerState({
          currentTime: resetTime,
          isRunning: false,
        })
        break

      case "setDuration":
        const duration = Number(body.duration) || 0
        if (duration < 0 || duration > 24 * 60 * 60 * 1000) {
          // Max 24 horas
          return NextResponse.json({ error: "Duração inválida" }, { status: 400 })
        }
        newState = updateTimerState({
          duration,
          currentTime: duration,
          isRunning: false,
        })
        break

      case "setMode":
        const mode = body.mode
        if (mode !== "countdown" && mode !== "countup") {
          return NextResponse.json({ error: "Modo inválido" }, { status: 400 })
        }
        const currentStateForMode = getTimerState()
        const initialTime = mode === "countdown" ? currentStateForMode.duration : 0
        newState = updateTimerState({
          mode,
          currentTime: initialTime,
          isRunning: false,
        })
        break

      default:
        return NextResponse.json({ error: "Ação não reconhecida" }, { status: 400 })
    }

    console.log("Novo estado:", newState)
    return NextResponse.json(newState, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Erro ao processar ação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
