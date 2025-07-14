import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Eye, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Clock className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Timer Vila Zelina</h1>
          <p className="text-gray-600">Sistema de timer sincronizado para controle remoto em apresentações</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Mesa de Som
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Interface de controle para o operador de áudio. Configure e controle o timer da palestra.
              </p>
              <Link href="/control">
                <Button className="w-full">Acessar Controle</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Tribuna
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Visualização limpa do timer para o palestrante. Interface sem distrações para o tablet da tribuna.
              </p>
              <Link href="/display">
                <Button variant="outline" className="w-full bg-transparent">
                  Visualizar Timer
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Como usar:</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. O operador de som acessa "Mesa de Som" e controla o timer</li>
              <li>2. Configure o tempo e modo (regressivo/progressivo)</li>
              <li>3. O palestrante acessa "Tribuna" no tablet (apenas visualização)</li>
              <li>4. Timer pulsa discretamente nos últimos 30 segundos</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
