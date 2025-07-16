"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, FileText, Users, DollarSign, Settings, Workflow } from "lucide-react"

export default function OrdemCompra() {
  const [formData, setFormData] = useState({
    // Tipo de Projeto
    tipoProjeto: "integracao", // "integracao" ou "melhoria"

    // Dados do Cliente
    nomeFantasia: "",
    razaoSocial: "",
    endereco: "",
    cep: "",
    cnpj: "",
    cidade: "",

    // Responsáveis
    nomeResponsavelTecnico: "",
    telefoneResponsavelTecnico: "",
    emailResponsavelTecnico: "",

    // Dados Comerciais - Editáveis
    investimentoMensal: "1.399,00",
    investimentoSetup: "6.600,00",
    tempoContrato: "12",
    formaPagamento: "Boleto/PIX",
    diaVencimento: "10",
    parcelamentoSetup: "1", // Novo campo
    parcelamentoMelhoria: "1", // Novo campo

    // Assinaturas
    nomeRepresentanteContratante: "",
    cpfRepresentanteContratante: "",
    emailRepresentanteContratante: "",
    nomeRepresentanteContratada: "Rodrigo Vieira",
    cpfRepresentanteContratada: "",
    emailRepresentanteContratada: "rodrigo.vieira@tivit.com",

    // Testemunhas
    nomeTestemunha1: "",
    cpfTestemunha1: "",
    emailTestemunha1: "",
    nomeTestemunha2: "",
    cpfTestemunha2: "",
    emailTestemunha2: "",

    // Outros
    tvt: "234578",
    dataOC: new Date().toLocaleDateString("pt-BR"),
    dataValidade: "22/07/25",
    diaVencimentoGeral: "10", // Para não confundir com o vencimento específico

    // Campos para Integração
    tituloEscopo: "Automatização de dados entre sistemas PandaPé e ATS G4S",
    descricaoEscopo: "Contendo 2 fluxos de integração",
    tempoProjeto: "20 dias úteis",
    fluxosInclusos: "10",
    apiCalls: "1.000.000",
    horasOnboarding: "8",
    suporteTipo: "8x5",
    quantidadeFluxos: 2,
    fluxos: ["Candidatos (Successfactors → Pandapé)", "Vagas (Pandapé → Successfactors)"],

    // Campos para Melhorias
    tituloMelhoria: "",
    descricaoMelhoria: "",
    horasVendidas: "",
    prazoMelhoria: "",
    valorTotalMelhoria: "",
  })

  const handleInputChange = (field: string, value: string) => {
    // Sincronizar os campos de vencimento
    if (field === "diaVencimentoGeral") {
      setFormData((prev) => ({ ...prev, [field]: value, diaVencimento: value }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const calcularValorTotal = () => {
    if (formData.tipoProjeto === "melhoria") {
      return formData.valorTotalMelhoria || "0,00"
    } else {
      return (
        Number.parseFloat(formData.investimentoSetup.replace(".", "").replace(",", ".")) +
        Number.parseFloat(formData.investimentoMensal.replace(".", "").replace(",", ".")) *
          Number.parseInt(formData.tempoContrato)
      ).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* PÁGINA 1: Cabeçalho até Responsável Técnico */}

      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">ORDEM DE COMPRA</h1>
          <p className="text-lg">TIVIT DevAPI - Plataforma de Integração de Sistemas</p>
        </div>

        {/* Campos editáveis (ocultos na impressão) */}
        <div className="grid grid-cols-2 gap-4 mb-6 print:hidden">
          <div className="text-left space-y-3">
            <div>
              <Label htmlFor="dataOC" className="text-sm font-medium">
                Data:
              </Label>
              <Input
                id="dataOC"
                value={formData.dataOC}
                onChange={(e) => handleInputChange("dataOC", e.target.value)}
                placeholder="DD/MM/AAAA"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tvt" className="text-sm font-medium">
                TVT:
              </Label>
              <Input
                id="tvt"
                value={formData.tvt}
                onChange={(e) => handleInputChange("tvt", e.target.value)}
                placeholder="234578"
                className="mt-1"
              />
            </div>
          </div>
          <div className="text-right space-y-3">
            <div>
              <Label htmlFor="dataValidade" className="text-sm font-medium">
                Validade:
              </Label>
              <Input
                id="dataValidade"
                value={formData.dataValidade}
                onChange={(e) => handleInputChange("dataValidade", e.target.value)}
                placeholder="DD/MM/AA"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="diaVencimentoGeral" className="text-sm font-medium">
                Vencimento:
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">Todo dia</span>
                <Input
                  id="diaVencimentoGeral"
                  value={formData.diaVencimentoGeral}
                  onChange={(e) => handleInputChange("diaVencimentoGeral", e.target.value)}
                  placeholder="10"
                  className="w-16"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Versão para impressão (visível apenas na impressão) */}
        <div className="hidden print:block print-header-grid">
          <div className="print-header-left">
            <div className="print-field">
              <span className="print-field-label">Data:</span>
              <span className="print-field-value">{formData.dataOC}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">TVT:</span>
              <span className="print-field-value">{formData.tvt}</span>
            </div>
          </div>
          <div className="print-header-right text-right">
            <div className="print-field">
              <span className="print-field-label">Validade:</span>
              <span className="print-field-value">{formData.dataValidade}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Vencimento:</span>
              <span className="print-field-value">Todo dia {formData.diaVencimentoGeral}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Tipo de Projeto */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Tipo de Projeto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.tipoProjeto === "integracao"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleInputChange("tipoProjeto", "integracao")}
            >
              <div className="flex items-center gap-3">
                <Workflow className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Fluxos de Integração</h3>
                  <p className="text-sm text-gray-600">Projeto completo de integração entre sistemas</p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.tipoProjeto === "melhoria"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleInputChange("tipoProjeto", "melhoria")}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="font-semibold">Melhorias</h3>
                  <p className="text-sm text-gray-600">Ajustes e melhorias em integrações existentes</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações da Empresa Cliente */}
      <Card className="mb-6 print:border-0 print:shadow-none">
        <CardHeader className="print:hidden">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Informações da Empresa Contratante
          </CardTitle>
        </CardHeader>

        {/* Título para impressão */}
        <div className="hidden print:block print-card-title">Informações da Empresa Contratante</div>

        <CardContent className="print:p-0">
          {/* Campos editáveis (ocultos na impressão) */}
          <div className="grid grid-cols-2 gap-4 print:hidden">
            <div>
              <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
              <Input
                id="nomeFantasia"
                value={formData.nomeFantasia}
                onChange={(e) => handleInputChange("nomeFantasia", e.target.value)}
                placeholder="Digite o nome fantasia"
              />
            </div>
            <div>
              <Label htmlFor="razaoSocial">Razão Social</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => handleInputChange("razaoSocial", e.target.value)}
                placeholder="Digite a razão social"
              />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="Digite o endereço completo"
              />
            </div>
            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleInputChange("cep", e.target.value)}
                placeholder="00000-000"
              />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => handleInputChange("cnpj", e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => handleInputChange("cidade", e.target.value)}
                placeholder="Digite a cidade"
              />
            </div>
          </div>

          {/* Versão para impressão */}
          <div className="hidden print:block print-grid-2">
            <div className="print-field">
              <span className="print-field-label">Nome Fantasia:</span>
              <span className="print-field-value">{formData.nomeFantasia || "Não informado"}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Razão Social:</span>
              <span className="print-field-value">{formData.razaoSocial || "Não informado"}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Endereço:</span>
              <span className="print-field-value">{formData.endereco || "Não informado"}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">CEP:</span>
              <span className="print-field-value">{formData.cep || "Não informado"}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">CNPJ:</span>
              <span className="print-field-value">{formData.cnpj || "Não informado"}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Cidade:</span>
              <span className="print-field-value">{formData.cidade || "Não informado"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsáveis - Final da Página 1 */}
      <Card className="mb-6 page-1-end">
        <CardHeader>
          <CardTitle>Responsável Técnico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 print:hidden">
            <div>
              <Label htmlFor="nomeResponsavelTecnico">Nome</Label>
              <Input
                id="nomeResponsavelTecnico"
                value={formData.nomeResponsavelTecnico}
                onChange={(e) => handleInputChange("nomeResponsavelTecnico", e.target.value)}
                placeholder="Nome do responsável técnico"
              />
            </div>
            <div>
              <Label htmlFor="telefoneResponsavelTecnico">Telefone</Label>
              <Input
                id="telefoneResponsavelTecnico"
                value={formData.telefoneResponsavelTecnico}
                onChange={(e) => handleInputChange("telefoneResponsavelTecnico", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="emailResponsavelTecnico">E-mail</Label>
              <Input
                id="emailResponsavelTecnico"
                value={formData.emailResponsavelTecnico}
                onChange={(e) => handleInputChange("emailResponsavelTecnico", e.target.value)}
                placeholder="email@empresa.com"
              />
            </div>
          </div>

          {/* Versão para impressão */}
          <div className="hidden print:block print-grid-3">
            <div className="print-field">
              <span className="print-field-label">Nome:</span>
              <span className="print-field-value">{formData.nomeResponsavelTecnico || "Não informado"}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Telefone:</span>
              <span className="print-field-value">{formData.telefoneResponsavelTecnico || "Não informado"}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">E-mail:</span>
              <span className="print-field-value">{formData.emailResponsavelTecnico || "Não informado"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PÁGINA 2: Anexo I e II */}

      {/* Anexo I - Escopo - Mais compacto */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Anexo I - Escopo do Projeto
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {formData.tipoProjeto === "integracao" ? (
            // Escopo para Integração - Layout mais compacto
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="tituloEscopo" className="text-sm">
                    Título do Projeto
                  </Label>
                  <Input
                    id="tituloEscopo"
                    value={formData.tituloEscopo}
                    onChange={(e) => handleInputChange("tituloEscopo", e.target.value)}
                    placeholder="Ex: Automatização de dados entre sistemas PandaPé e ATS G4S"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="descricaoEscopo" className="text-sm">
                    Descrição Geral
                  </Label>
                  <Input
                    id="descricaoEscopo"
                    value={formData.descricaoEscopo}
                    onChange={(e) => handleInputChange("descricaoEscopo", e.target.value)}
                    placeholder="Ex: Contendo X fluxos de integração"
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Seletor de quantidade de fluxos - mais compacto */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <Label htmlFor="quantidadeFluxos" className="text-sm font-medium">
                  Quantidade de Fluxos de Integração
                </Label>
                <select
                  id="quantidadeFluxos"
                  value={formData.quantidadeFluxos}
                  onChange={(e) => {
                    const quantidade = Number.parseInt(e.target.value)
                    const novosFluxos = [...formData.fluxos]

                    if (quantidade > formData.fluxos.length) {
                      for (let i = formData.fluxos.length; i < quantidade; i++) {
                        novosFluxos.push("")
                      }
                    } else {
                      novosFluxos.splice(quantidade)
                    }

                    setFormData((prev) => ({
                      ...prev,
                      quantidadeFluxos: quantidade,
                      fluxos: novosFluxos,
                    }))
                  }}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  {[...Array(30)].map((_, index) => {
                    const num = index + 1
                    return (
                      <option key={num} value={num}>
                        {num} fluxo{num > 1 ? "s" : ""}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* Campos dinâmicos para os fluxos - mais compactos */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Detalhamento dos Fluxos:</Label>
                {Array.from({ length: formData.quantidadeFluxos }, (_, index) => (
                  <div key={index}>
                    <Label htmlFor={`fluxo${index + 1}`} className="text-xs">
                      Fluxo {index + 1}
                    </Label>
                    <Input
                      id={`fluxo${index + 1}`}
                      value={formData.fluxos[index] || ""}
                      onChange={(e) => {
                        const novosFluxos = [...formData.fluxos]
                        novosFluxos[index] = e.target.value
                        setFormData((prev) => ({ ...prev, fluxos: novosFluxos }))
                      }}
                      placeholder={`Ex: Sistema A → Sistema B (descrição do fluxo ${index + 1})`}
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-2">
                <div>
                  <Label htmlFor="tempoProjeto" className="text-xs">
                    Tempo de Projeto
                  </Label>
                  <Input
                    id="tempoProjeto"
                    value={formData.tempoProjeto}
                    onChange={(e) => handleInputChange("tempoProjeto", e.target.value)}
                    placeholder="20 dias úteis"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="fluxosInclusos" className="text-xs">
                    Fluxos Inclusos
                  </Label>
                  <Input
                    id="fluxosInclusos"
                    value={formData.fluxosInclusos}
                    onChange={(e) => handleInputChange("fluxosInclusos", e.target.value)}
                    placeholder="10"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="apiCalls" className="text-xs">
                    API Calls
                  </Label>
                  <Input
                    id="apiCalls"
                    value={formData.apiCalls}
                    onChange={(e) => handleInputChange("apiCalls", e.target.value)}
                    placeholder="1.000.000"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="horasOnboarding" className="text-xs">
                    Horas Onboarding
                  </Label>
                  <Input
                    id="horasOnboarding"
                    value={formData.horasOnboarding}
                    onChange={(e) => handleInputChange("horasOnboarding", e.target.value)}
                    placeholder="8"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="suporteTipo" className="text-xs">
                    Tipo de Suporte
                  </Label>
                  <Input
                    id="suporteTipo"
                    value={formData.suporteTipo}
                    onChange={(e) => handleInputChange("suporteTipo", e.target.value)}
                    placeholder="8x5"
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Resumo do projeto - mais compacto */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-base mb-2">{formData.tituloEscopo || "Título do Projeto"}</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  {formData.descricaoEscopo ||
                    `Contendo ${formData.quantidadeFluxos} fluxo${
                      formData.quantidadeFluxos > 1 ? "s" : ""
                    } de integração`}
                </p>

                <div className="space-y-2 mb-3">
                  {formData.fluxos.map(
                    (fluxo, index) =>
                      fluxo && (
                        <div key={index} className="border-l-4 border-blue-500 pl-3">
                          <h4 className="font-medium text-sm">
                            Fluxo {index + 1}: {fluxo}
                          </h4>
                        </div>
                      ),
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Especificações Técnicas:</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Tempo de projeto: {formData.tempoProjeto || "20 dias úteis"}</li>
                      <li>• Fluxos inclusos: {formData.fluxosInclusos || "10"}</li>
                      <li>• API Calls: {formData.apiCalls || "1.000.000"}</li>
                      <li>• Suporte: {formData.suporteTipo || "8x5"}</li>
                      <li>• Onboarding: {formData.horasOnboarding || "8"} horas</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Entregas:</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Conectores personalizados</li>
                      <li>• Fluxos de trabalho automatizados</li>
                      <li>• Documentação técnica</li>
                      <li>• Treinamento da equipe</li>
                      <li>• Suporte pós-implementação</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Escopo para Melhorias
            <div className="space-y-4">
              <div>
                <Label htmlFor="tituloMelhoria">Título da Melhoria</Label>
                <Input
                  id="tituloMelhoria"
                  value={formData.tituloMelhoria}
                  onChange={(e) => handleInputChange("tituloMelhoria", e.target.value)}
                  placeholder="Ex: Otimização de performance nas integrações existentes"
                />
              </div>

              <div>
                <Label htmlFor="descricaoMelhoria">Descrição Detalhada</Label>
                <textarea
                  id="descricaoMelhoria"
                  value={formData.descricaoMelhoria}
                  onChange={(e) => handleInputChange("descricaoMelhoria", e.target.value)}
                  placeholder="Descreva detalhadamente as melhorias que serão implementadas..."
                  className="w-full p-3 border border-gray-300 rounded-md min-h-[100px] resize-y"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horasVendidas">Horas Vendidas</Label>
                  <Input
                    id="horasVendidas"
                    value={formData.horasVendidas}
                    onChange={(e) => handleInputChange("horasVendidas", e.target.value)}
                    placeholder="Ex: 40"
                  />
                </div>
                <div>
                  <Label htmlFor="prazoMelhoria">Prazo de Entrega</Label>
                  <Input
                    id="prazoMelhoria"
                    value={formData.prazoMelhoria}
                    onChange={(e) => handleInputChange("prazoMelhoria", e.target.value)}
                    placeholder="Ex: 10 dias úteis"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{formData.tituloMelhoria || "Título da Melhoria"}</h3>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {formData.descricaoMelhoria || "Descrição detalhada das melhorias a serem implementadas."}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Especificações:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Horas: {formData.horasVendidas || "0"} horas</li>
                      <li>• Prazo: {formData.prazoMelhoria || "A definir"}</li>
                      <li>• Valor total: R$ {formData.valorTotalMelhoria || "0,00"}</li>
                      <li>
                        • Parcelamento:{" "}
                        {formData.parcelamentoMelhoria === "1" ? "À vista" : `${formData.parcelamentoMelhoria}x`}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Entregas:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Implementação das melhorias</li>
                      <li>• Testes e validação</li>
                      <li>• Documentação atualizada</li>
                      <li>• Relatório de conclusão</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Anexo II - Valores - Final da Página 2 */}
      <Card className="mb-6 page-2-end">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5" />
            Anexo II - Valores e Condições Comerciais
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {formData.tipoProjeto === "integracao" ? (
            // Valores para Integração
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-base mb-2">Professional Services</h3>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="investimentoSetup" className="text-sm">
                        Valor Total (R$)
                      </Label>
                      <Input
                        id="investimentoSetup"
                        value={formData.investimentoSetup}
                        onChange={(e) => handleInputChange("investimentoSetup", e.target.value)}
                        placeholder="6.600,00"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parcelamentoSetup" className="text-sm">
                        Parcelamento
                      </Label>
                      <select
                        id="parcelamentoSetup"
                        value={formData.parcelamentoSetup}
                        onChange={(e) => handleInputChange("parcelamentoSetup", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="1">À vista</option>
                        <option value="2">2x</option>
                        <option value="3">3x</option>
                        <option value="4">4x</option>
                      </select>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Valor por parcela:</span>
                      <span>
                        {formData.parcelamentoSetup === "1"
                          ? `R$ ${formData.investimentoSetup}`
                          : `${formData.parcelamentoSetup}x de R$ ${(
                              Number.parseFloat(formData.investimentoSetup.replace(".", "").replace(",", ".")) /
                                Number.parseInt(formData.parcelamentoSetup)
                            ).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-base mb-2">Plano Essencial</h3>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="investimentoMensal" className="text-sm">
                        Valor Mensal (R$)
                      </Label>
                      <Input
                        id="investimentoMensal"
                        value={formData.investimentoMensal}
                        onChange={(e) => handleInputChange("investimentoMensal", e.target.value)}
                        placeholder="1.399,00"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tempoContrato" className="text-sm">
                        Contrato (meses)
                      </Label>
                      <Input
                        id="tempoContrato"
                        value={formData.tempoContrato}
                        onChange={(e) => handleInputChange("tempoContrato", e.target.value)}
                        placeholder="12"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="diaVencimento" className="text-sm">
                        Dia Vencimento
                      </Label>
                      <Input
                        id="diaVencimento"
                        value={formData.diaVencimento}
                        onChange={(e) => handleInputChange("diaVencimento", e.target.value)}
                        placeholder="10"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
                <h4 className="font-bold text-base mb-3 text-center text-gray-800">💰 Resumo Financeiro</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-green-600">R$ {formData.investimentoSetup}</div>
                    <div className="text-xs text-gray-600">Valor Setup</div>
                    <div className="text-xs text-gray-500 mt-1">Pagamento único</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-blue-600">R$ {formData.investimentoMensal}</div>
                    <div className="text-xs text-gray-600">Valor Mensal</div>
                    <div className="text-xs text-gray-500 mt-1">Recorrente por {formData.tempoContrato} meses</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-purple-600">R$ {calcularValorTotal()}</div>
                    <div className="text-xs text-gray-600">Valor Total</div>
                    <div className="text-xs text-gray-500 mt-1">Setup + {formData.tempoContrato} mensalidades</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <Label htmlFor="formaPagamento" className="text-xs">
                        Forma de Pagamento
                      </Label>
                      <Input
                        id="formaPagamento"
                        value={formData.formaPagamento}
                        onChange={(e) => handleInputChange("formaPagamento", e.target.value)}
                        placeholder="Boleto/PIX"
                        className="text-sm"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">Vencimento:</span>
                      <span className="ml-1 text-sm">Dia {formData.diaVencimentoGeral} de cada mês</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Valores para Melhorias
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="font-semibold text-lg mb-4">Serviço de Melhorias</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="valorTotalMelhoria">Valor Total (R$)</Label>
                    <Input
                      id="valorTotalMelhoria"
                      value={formData.valorTotalMelhoria}
                      onChange={(e) => handleInputChange("valorTotalMelhoria", e.target.value)}
                      placeholder="Ex: 6.000,00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parcelamentoMelhoria">Parcelamento</Label>
                    <select
                      id="parcelamentoMelhoria"
                      value={formData.parcelamentoMelhoria}
                      onChange={(e) => handleInputChange("parcelamentoMelhoria", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="1">À vista</option>
                      <option value="2">2x</option>
                      <option value="3">3x</option>
                      <option value="4">4x</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="formaPagamentoMelhoria">Forma de Pagamento</Label>
                    <Input
                      id="formaPagamentoMelhoria"
                      value={formData.formaPagamento}
                      onChange={(e) => handleInputChange("formaPagamento", e.target.value)}
                      placeholder="Boleto/PIX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prazoMelhoria">Prazo de Entrega</Label>
                    <Input
                      id="prazoMelhoria"
                      value={formData.prazoMelhoria}
                      onChange={(e) => handleInputChange("prazoMelhoria", e.target.value)}
                      placeholder="10 dias úteis"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diaVencimentoMelhoria">Dia Vencimento</Label>
                    <Input
                      id="diaVencimentoMelhoria"
                      value={formData.diaVencimento}
                      onChange={(e) => handleInputChange("diaVencimento", e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span className="font-medium">Valor por parcela:</span>
                      <span className="font-bold text-green-600">
                        {formData.parcelamentoMelhoria === "1"
                          ? `R$ ${formData.valorTotalMelhoria || "0,00"}`
                          : `${formData.parcelamentoMelhoria}x de R$ ${
                              formData.valorTotalMelhoria
                                ? (
                                    Number.parseFloat(formData.valorTotalMelhoria.replace(".", "").replace(",", ".")) /
                                    Number.parseInt(formData.parcelamentoMelhoria)
                                  ).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : "0,00"
                            }`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-center text-gray-800">💰 Resumo Financeiro</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">{formData.horasVendidas || "0"}</div>
                    <div className="text-sm text-gray-600">Horas Vendidas</div>
                    <div className="text-xs text-gray-500 mt-1">Total de horas</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{formData.parcelamentoMelhoria}x</div>
                    <div className="text-sm text-gray-600">Parcelas</div>
                    <div className="text-xs text-gray-500 mt-1">Forma de pagamento</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-purple-600">R$ {formData.valorTotalMelhoria || "0,00"}</div>
                    <div className="text-sm text-gray-600">Valor Total</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.parcelamentoMelhoria === "1" ? "À vista" : `${formData.parcelamentoMelhoria} parcelas`}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Forma de Pagamento:</span> {formData.formaPagamento}
                    </div>
                    <div>
                      <span className="font-medium">Prazo:</span> {formData.prazoMelhoria || "A definir"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* PÁGINA 3: Matriz de SLA apenas */}
      {formData.tipoProjeto === "integracao" && (
        <Card className="mb-6 page-3-end">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />📊 Matriz de Prioridades de SLA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Prioridade</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Descrição</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Regras de SLA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="font-bold text-red-700">Urgente</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Situações onde o sistema para de integrar de forma integral, gerando impacto direto no cliente.
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Tempo para resposta de até <strong>4 horas úteis</strong> e resolução em até{" "}
                      <strong>8 horas úteis</strong>.
                    </td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="font-bold text-orange-700">Alta</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Situações onde o sistema para de integrar de forma parcial, porém gerando impacto moderado no
                      cliente.
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Tempo para resposta de até <strong>12 horas úteis</strong> e resolução em até{" "}
                      <strong>1 dia e meio útil</strong>.
                    </td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="font-bold text-yellow-700">Média</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Situações onde o sistema integra, porém gerando algum erro nas integrações, causando um impacto
                      baixo até moderado ao cliente.
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Tempo de resposta de até <strong>24 horas úteis</strong> e resolução em até{" "}
                      <strong>2 dias úteis</strong>.
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="font-bold text-blue-700">Baixa</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Situações onde o sistema integra normalmente e sem nenhum relato de erros nas integrações, porém
                      com algumas melhorias solicitadas pelo cliente.
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      Tempo para resposta de até <strong>48 horas úteis</strong> e aplicação da melhoria ou calibrar em
                      até <strong>5 dias úteis</strong>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Observação:</strong> Os prazos são contados em dias e horas úteis (Segunda a Sexta, das 8h às
                18h, exceto feriados nacionais).
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PÁGINA 4: Acordo de Nível de Serviço e Próximos Passos */}
      {formData.tipoProjeto === "integracao" && (
        <>
          {/* Acordo de Nível de Serviço */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Acordo de Nível de Serviço (SLA)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Versão para tela */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 print:hidden">
                {/* Premissas */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Premissas do Cliente</h4>
                      <p className="text-sm text-blue-600">Requisitos obrigatórios</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Fornecimento de credenciais de acesso</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Documentação das APIs disponibilizada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Queries de banco prontas (se aplicável)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Mapeamento/validação dos campos das APIs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Homologação em até 15 dias após entrega</span>
                    </div>
                  </div>
                </div>

                {/* Suporte e Melhorias */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">⚠️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800">Suporte e Melhorias</h4>
                      <p className="text-sm text-orange-600">Regras importantes</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-orange-100">
                      <p className="text-sm font-medium text-orange-800 mb-1">Alterações Pós-Produção:</p>
                      <p className="text-xs text-orange-700">
                        Solicitações de alteração em itens ou ambientes já entregues em produção serão tratadas como
                        melhorias e gerarão custo adicional por hora.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-orange-100">
                      <p className="text-sm font-medium text-orange-800 mb-1">Mudanças de Escopo:</p>
                      <p className="text-xs text-orange-700">
                        Toda solicitação de mudança dos ambientes, integrações, campos ou componentes será classificada
                        como melhoria.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Homologação e Entrega */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">Homologação e Entrega</h4>
                      <p className="text-sm text-purple-600">Processo de finalização</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-purple-100">
                      <p className="text-sm font-medium text-purple-800 mb-1">Prazo de Homologação:</p>
                      <p className="text-xs text-purple-700">
                        A conclusão do projeto só ocorrerá após homologação. Esta deverá acontecer em até 15 dias após a
                        entrega do desenvolvimento.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-purple-100">
                      <p className="text-sm font-medium text-purple-800 mb-1">Prazo de Entrega:</p>
                      <p className="text-xs text-purple-700">
                        O prazo de entrega passa a ser contado após kick-off e cumprimento de todas as premissas
                        listadas.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-purple-100">
                      <p className="text-sm font-medium text-purple-800 mb-1">Não Retorno:</p>
                      <p className="text-xs text-purple-700">
                        Em caso de não retorno da homologação em 15 dias, o projeto será dado como concluído e entregue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Versão para impressão */}
              <div className="hidden print:block print-sla-container">
                {/* Premissas do Cliente */}
                <div className="print-sla-card blue">
                  <div className="print-sla-header">
                    <div className="print-sla-icon blue">📄</div>
                    <div>
                      <div className="print-sla-title blue">Premissas do Cliente</div>
                      <div className="print-sla-subtitle">Requisitos obrigatórios</div>
                    </div>
                  </div>
                  <div className="print-sla-content">
                    <ul className="print-sla-list">
                      <li className="print-sla-list-item">
                        <div className="print-sla-bullet blue"></div>
                        <span>Fornecimento de credenciais de acesso</span>
                      </li>
                      <li className="print-sla-list-item">
                        <div className="print-sla-bullet blue"></div>
                        <span>Documentação das APIs disponibilizada</span>
                      </li>
                      <li className="print-sla-list-item">
                        <div className="print-sla-bullet blue"></div>
                        <span>Queries de banco prontas (se aplicável)</span>
                      </li>
                      <li className="print-sla-list-item">
                        <div className="print-sla-bullet blue"></div>
                        <span>Mapeamento/validação dos campos das APIs</span>
                      </li>
                      <li className="print-sla-list-item">
                        <div className="print-sla-bullet blue"></div>
                        <span>Homologação em até 15 dias após entrega</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Suporte e Melhorias */}
                <div className="print-sla-card orange">
                  <div className="print-sla-header">
                    <div className="print-sla-icon orange">⚠</div>
                    <div>
                      <div className="print-sla-title orange">Suporte e Melhorias</div>
                      <div className="print-sla-subtitle">Regras importantes</div>
                    </div>
                  </div>
                  <div className="print-sla-content">
                    <div className="print-sla-section">
                      <div className="print-sla-section-title">Alterações Pós-Produção:</div>
                      <div className="print-sla-section-content">
                        Solicitações de alteração em itens ou ambientes já entregues em produção serão tratadas como
                        melhorias e gerarão custo adicional por hora.
                      </div>
                    </div>
                    <div className="print-sla-section">
                      <div className="print-sla-section-title">Mudanças de Escopo:</div>
                      <div className="print-sla-section-content">
                        Toda solicitação de mudança dos ambientes, integrações, campos ou componentes será classificada
                        como melhoria.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Homologação e Entrega */}
                <div className="print-sla-card purple">
                  <div className="print-sla-header">
                    <div className="print-sla-icon purple">✓</div>
                    <div>
                      <div className="print-sla-title purple">Homologação e Entrega</div>
                      <div className="print-sla-subtitle">Processo de finalização</div>
                    </div>
                  </div>
                  <div className="print-sla-content">
                    <div className="print-sla-purple-section">
                      <div className="print-sla-purple-title">Prazo de Homologação:</div>
                      <div className="print-sla-purple-content">
                        A conclusão do projeto só ocorrerá após homologação. Esta deverá acontecer em até 15 dias após a
                        entrega do desenvolvimento.
                      </div>
                    </div>
                    <div className="print-sla-purple-section">
                      <div className="print-sla-purple-title">Prazo de Entrega:</div>
                      <div className="print-sla-purple-content">
                        O prazo de entrega passa a ser contado após kick-off e cumprimento de todas as premissas
                        listadas.
                      </div>
                    </div>
                    <div className="print-sla-purple-section">
                      <div className="print-sla-purple-title">Não Retorno:</div>
                      <div className="print-sla-purple-content">
                        Em caso de não retorno da homologação em 15 dias, o projeto será dado como concluído e entregue.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Passos - Final da Página 4 */}
          <Card className="mb-6 page-4-end">
            <CardHeader>
              <CardTitle className="text-center">📋 Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Versão para tela */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200 print:hidden">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      1
                    </div>
                    <div className="text-xs font-medium">Assinatura da OC</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      2
                    </div>
                    <div className="text-xs font-medium">Kick-off</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      3
                    </div>
                    <div className="text-xs font-medium">Desenvolvimento</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      4
                    </div>
                    <div className="text-xs font-medium">Homologação</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      5
                    </div>
                    <div className="text-xs font-medium">Entrega Final</div>
                  </div>
                </div>
              </div>

              {/* Versão para impressão */}
              <div className="hidden print:block print-steps-container">
                <div className="print-steps-grid">
                  <div className="print-step-item">
                    <div className="print-step-circle step-1">1</div>
                    <div className="print-step-label">Assinatura da OC</div>
                  </div>
                  <div className="print-step-item">
                    <div className="print-step-circle step-2">2</div>
                    <div className="print-step-label">Kick-off</div>
                  </div>
                  <div className="print-step-item">
                    <div className="print-step-circle step-3">3</div>
                    <div className="print-step-label">Desenvolvimento</div>
                  </div>
                  <div className="print-step-item">
                    <div className="print-step-circle step-4">4</div>
                    <div className="print-step-label">Homologação</div>
                  </div>
                  <div className="print-step-item">
                    <div className="print-step-circle step-5">5</div>
                    <div className="print-step-label">Entrega Final</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* PÁGINA 5: Assinaturas */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assinatura da Ordem de Compra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-3">Contratante:</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="nomeRepresentanteContratante">Nome do Representante</Label>
                  <Input
                    id="nomeRepresentanteContratante"
                    value={formData.nomeRepresentanteContratante}
                    onChange={(e) => handleInputChange("nomeRepresentanteContratante", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="cpfRepresentanteContratante">CPF</Label>
                  <Input
                    id="cpfRepresentanteContratante"
                    value={formData.cpfRepresentanteContratante}
                    onChange={(e) => handleInputChange("cpfRepresentanteContratante", e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="emailRepresentanteContratante">E-mail</Label>
                  <Input
                    id="emailRepresentanteContratante"
                    value={formData.emailRepresentanteContratante}
                    onChange={(e) => handleInputChange("emailRepresentanteContratante", e.target.value)}
                    placeholder="email@empresa.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Contratada (TIVIT):</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="nomeRepresentanteContratada">Nome do Representante</Label>
                  <Input
                    id="nomeRepresentanteContratada"
                    value={formData.nomeRepresentanteContratada}
                    onChange={(e) => handleInputChange("nomeRepresentanteContratada", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cpfRepresentanteContratada">CPF</Label>
                  <Input
                    id="cpfRepresentanteContratada"
                    value={formData.cpfRepresentanteContratada}
                    onChange={(e) => handleInputChange("cpfRepresentanteContratada", e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="emailRepresentanteContratada">E-mail</Label>
                  <Input
                    id="emailRepresentanteContratada"
                    value={formData.emailRepresentanteContratada}
                    onChange={(e) => handleInputChange("emailRepresentanteContratada", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="font-medium mb-3">Testemunhas:</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium mb-2">Testemunha 1:</h5>
                <div className="space-y-2">
                  <Input
                    value={formData.nomeTestemunha1}
                    onChange={(e) => handleInputChange("nomeTestemunha1", e.target.value)}
                    placeholder="Nome completo"
                  />
                  <Input
                    value={formData.cpfTestemunha1}
                    onChange={(e) => handleInputChange("cpfTestemunha1", e.target.value)}
                    placeholder="CPF"
                  />
                  <Input
                    value={formData.emailTestemunha1}
                    onChange={(e) => handleInputChange("emailTestemunha1", e.target.value)}
                    placeholder="E-mail"
                  />
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-2">Testemunha 2:</h5>
                <div className="space-y-2">
                  <Input
                    value={formData.nomeTestemunha2}
                    onChange={(e) => handleInputChange("nomeTestemunha2", e.target.value)}
                    placeholder="Nome completo"
                  />
                  <Input
                    value={formData.cpfTestemunha2}
                    onChange={(e) => handleInputChange("cpfTestemunha2", e.target.value)}
                    placeholder="CPF"
                  />
                  <Input
                    value={formData.emailTestemunha2}
                    onChange={(e) => handleInputChange("emailTestemunha2", e.target.value)}
                    placeholder="E-mail"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Declaração:</strong> Esta Ordem de Compra é firmada eletronicamente, com ou sem a utilização de
              certificado digital emitido no padrão estabelecido pela ICP-Brasil, reputando-se plenamente válida, em
              todo o seu conteúdo, a partir da aposição da última assinatura, informação essa que será reconhecida pelas
              partes em sua integridade e autenticidade, garantidas por sistema de criptografia, em conformidade com o
              artigo 10, § 2, da Medida Provisória 2200-2/2001, bem como legislação superveniente. Os signatários
              declaram ser os legítimos representantes das Partes e possuem poderes para firmar este Acordo, na presença
              de 2 (duas) testemunhas abaixo assinadas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-4 justify-center print:hidden">
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          Imprimir / Salvar PDF
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Limpar Formulário
        </Button>
      </div>

      {/* Rodapé */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t pt-4">
        <p>TIVIT DevAPI - Plataforma de Integração de Sistemas</p>
        <p>Rodrigo Vieira - Business Executive | rodrigo.vieira@tivit.com | 11 99101-8336</p>
      </div>
    </div>
  )
}
