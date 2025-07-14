import type { NextRequest } from "next/server"

// Estado global do timer (mesmo do route anterior)
const timerState = {
  duration: 0,
  currentTime: 0,
  isRunning: false,
  mode: "countdown",
  lastUpdate: Date.now(),
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Envia o estado inicial
      const data = `data: ${JSON.stringify(timerState)}\n\n`
      controller.enqueue(encoder.encode(data))

      // Atualiza a cada 100ms
      const interval = setInterval(() => {
        if (timerState.isRunning) {
          const now = Date.now()
          const elapsed = now - timerState.lastUpdate

          if (timerState.mode === "countdown") {
            timerState.currentTime = Math.max(0, timerState.currentTime - elapsed)
            if (timerState.currentTime <= 0) {
              timerState.isRunning = false
            }
          } else {
            timerState.currentTime += elapsed
          }

          timerState.lastUpdate = now
        }

        const data = `data: ${JSON.stringify(timerState)}\n\n`
        controller.enqueue(encoder.encode(data))
      }, 100)

      // Cleanup quando a conexão é fechada
      request.signal.addEventListener("abort", () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
