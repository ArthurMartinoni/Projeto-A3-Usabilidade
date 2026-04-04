import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const transacoes = [
  { id: 1, nome: "Salário", data: "01/04/2026", valor: 5000, tipo: "entrada" },
  {
    id: 2,
    nome: "Supermercado",
    data: "02/04/2026",
    valor: -350,
    tipo: "saida",
  },
  { id: 3, nome: "Netflix", data: "03/04/2026", valor: -45, tipo: "saida" },
  {
    id: 4,
    nome: "Transferência recebida",
    data: "03/04/2026",
    valor: 200,
    tipo: "entrada",
  },
  {
    id: 5,
    nome: "Conta de luz",
    data: "04/04/2026",
    valor: -180,
    tipo: "saida",
  },
  {
    id: 6,
    nome: "Freelance",
    data: "04/04/2026",
    valor: 1200,
    tipo: "entrada",
  },
  { id: 7, nome: "Restaurante", data: "04/04/2026", valor: -85, tipo: "saida" },
];

const historicos = {
  USDBRL: [
    { dia: "28/03", valor: 5.08 },
    { dia: "29/03", valor: 5.12 },
    { dia: "30/03", valor: 5.09 },
    { dia: "31/03", valor: 5.15 },
    { dia: "01/04", valor: 5.18 },
    { dia: "02/04", valor: 5.13 },
    { dia: "03/04", valor: 5.16 },
  ],
  EURBRL: [
    { dia: "28/03", valor: 5.8 },
    { dia: "29/03", valor: 5.85 },
    { dia: "30/03", valor: 5.78 },
    { dia: "31/03", valor: 5.9 },
    { dia: "01/04", valor: 5.93 },
    { dia: "02/04", valor: 5.88 },
    { dia: "03/04", valor: 5.94 },
  ],
  BTCBRL: [
    { dia: "28/03", valor: 340000 },
    { dia: "29/03", valor: 345000 },
    { dia: "30/03", valor: 338000 },
    { dia: "31/03", valor: 350000 },
    { dia: "01/04", valor: 355000 },
    { dia: "02/04", valor: 348000 },
    { dia: "03/04", valor: 354200 },
  ],
};

const labels = { USDBRL: "USD", EURBRL: "EUR", BTCBRL: "BTC" };
const nomes = { USDBRL: "Dólar", EURBRL: "Euro", BTCBRL: "Bitcoin" };

function Dashboard() {
  const [cotacoes, setCotacoes] = useState(null);
  const [saldoVisivel, setSaldoVisivel] = useState(true);
  const [moedaSelecionada, setMoedaSelecionada] = useState("USDBRL");

  const saldo = 12485.5;

  useEffect(() => {
    fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL",
    )
      .then((res) => res.json())
      .then((data) => setCotacoes(data))
      .catch(() => console.error("Erro ao buscar cotações"));
  }, []);

  const formatarValor = (moeda, valor) => {
    if (moeda === "BTCBRL") {
      return parseFloat(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      });
    }
    return parseFloat(valor).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-400 text-sm">Olá, usuário 👋</p>
            <h1 className="text-2xl font-bold">FlowBank</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold shrink-0">
            U
          </div>
        </header>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Coluna esquerda */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            {/* Card de saldo */}
            <section className="bg-indigo-600 rounded-2xl p-5 sm:p-6 w-full">
              <div className="flex items-center justify-between">
                <p className="text-indigo-200 text-sm">Saldo disponível</p>
                <button
                  onClick={() => setSaldoVisivel(!saldoVisivel)}
                  className="text-indigo-200 text-xs underline"
                >
                  {saldoVisivel ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <p className="text-3xl font-bold mt-1">
                {saldoVisivel
                  ? saldo.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "R$ ••••••"}
              </p>
              <div className="flex gap-2 sm:gap-3 mt-4">
                {["Transferir", "Depositar", "Pagar"].map((acao) => (
                  <button
                    key={acao}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm rounded-xl py-2 transition"
                  >
                    {acao}
                  </button>
                ))}
              </div>
            </section>

            {/* Gráfico */}
            <section className="bg-gray-800 rounded-2xl p-4 sm:p-6 w-full">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 className="font-semibold text-sm sm:text-base">
                  {nomes[moedaSelecionada]} — últimos 7 dias
                </h2>
                <div className="flex gap-2">
                  {Object.keys(labels).map((moeda) => (
                    <button
                      key={moeda}
                      onClick={() => setMoedaSelecionada(moeda)}
                      className={`text-xs px-3 py-1 rounded-full transition ${
                        moedaSelecionada === moeda
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      }`}
                    >
                      {labels[moeda]}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={historicos[moedaSelecionada]}>
                  <XAxis
                    dataKey="dia"
                    tick={{ fill: "#9ca3af", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis domain={["auto", "auto"]} hide />
                  <Tooltip
                    contentStyle={{
                      background: "#111827",
                      border: "none",
                      borderRadius: 8,
                      color: "#fff",
                      fontSize: 12,
                    }}
                    formatter={(v) => [
                      moedaSelecionada === "BTCBRL"
                        ? v.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            maximumFractionDigits: 0,
                          })
                        : `R$ ${v.toFixed(2)}`,
                      nomes[moedaSelecionada],
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            {/* Extrato */}
            <section className="w-full">
              <h2 className="font-semibold mb-3">Extrato</h2>
              <div className="flex flex-col gap-2">
                {transacoes.map((t) => (
                  <div
                    key={t.id}
                    className="bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${t.tipo === "entrada" ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <div>
                        <p className="text-sm font-medium">{t.nome}</p>
                        <p className="text-gray-400 text-xs">{t.data}</p>
                      </div>
                    </div>
                    <p
                      className={`font-bold text-sm shrink-0 ml-2 ${t.tipo === "entrada" ? "text-green-400" : "text-red-400"}`}
                    >
                      {t.tipo === "entrada" ? "+" : ""}
                      {t.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Cotações — em mobile vira grid horizontal */}
            <section>
              <h2 className="font-semibold mb-3">Cotações ao vivo</h2>
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
                {Object.keys(labels).map((moeda) => {
                  const dado = cotacoes?.[moeda];
                  const positivo = dado && parseFloat(dado.pctChange) >= 0;
                  const selecionado = moedaSelecionada === moeda;
                  return (
                    <button
                      key={moeda}
                      onClick={() => setMoedaSelecionada(moeda)}
                      className={`rounded-xl p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between transition text-left w-full ${
                        selecionado
                          ? "bg-indigo-600 ring-2 ring-indigo-400"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-xs ${selecionado ? "text-indigo-200" : "text-gray-400"}`}
                        >
                          {labels[moeda]}
                        </p>
                        <p className="font-bold text-sm sm:text-base mt-0.5">
                          {dado ? formatarValor(moeda, dado.bid) : "..."}
                        </p>
                      </div>
                      {dado && (
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-lg mt-2 lg:mt-0 w-fit ${
                            positivo
                              ? "bg-green-900/40 text-green-400"
                              : "bg-red-900/40 text-red-400"
                          }`}
                        >
                          {positivo ? "+" : ""}
                          {parseFloat(dado.pctChange).toFixed(isMobile ? 1 : 5)}
                          % %
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Resumo do mês */}
            <section className="bg-gray-800 rounded-2xl p-4 sm:p-5">
              <h2 className="font-semibold mb-4">Resumo do mês</h2>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">Entradas</p>
                  <p className="text-green-400 font-semibold text-sm">
                    {transacoes
                      .filter((t) => t.tipo === "entrada")
                      .reduce((acc, t) => acc + t.valor, 0)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">Saídas</p>
                  <p className="text-red-400 font-semibold text-sm">
                    {transacoes
                      .filter((t) => t.tipo === "saida")
                      .reduce((acc, t) => acc + t.valor, 0)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </p>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
                  <p className="text-gray-400 text-sm">Saldo do mês</p>
                  <p className="text-white font-bold text-sm">
                    {transacoes
                      .reduce((acc, t) => acc + t.valor, 0)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
