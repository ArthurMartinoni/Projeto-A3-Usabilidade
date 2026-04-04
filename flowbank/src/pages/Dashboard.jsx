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

const historicoUSD = [
  { dia: "28/03", valor: 5.08 },
  { dia: "29/03", valor: 5.12 },
  { dia: "30/03", valor: 5.09 },
  { dia: "31/03", valor: 5.15 },
  { dia: "01/04", valor: 5.18 },
  { dia: "02/04", valor: 5.13 },
  { dia: "03/04", valor: 5.16 },
];

function Dashboard() {
  const [cotacoes, setCotacoes] = useState(null);
  const [saldoVisivel, setSaldoVisivel] = useState(true);

  useEffect(() => {
    fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL",
    )
      .then((res) => res.json())
      .then((data) => setCotacoes(data))
      .catch(() => console.error("Erro ao buscar cotações"));
  }, []);

  const saldo = 12485.5;

  return (
    <div className="max-w-sm mx-auto px-4 pb-10">
      <header className="pt-8 pb-4 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Olá, usuário 👋</p>
          <h1 className="text-white text-2xl font-bold">FlowBank</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
          U
        </div>
      </header>

      <section className="bg-indigo-600 rounded-2xl p-6 mt-2">
        <div className="flex items-center justify-between">
          <p className="text-indigo-200 text-sm">Saldo disponível</p>
          <button
            onClick={() => setSaldoVisivel(!saldoVisivel)}
            className="text-indigo-200 text-xs underline"
          >
            {saldoVisivel ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <p className="text-white text-3xl font-bold mt-1">
          {saldoVisivel
            ? saldo.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "R$ ••••••"}
        </p>
        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-xl py-2">
            Transferir
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-xl py-2">
            Depositar
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-xl py-2">
            Pagar
          </button>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-white font-semibold mb-3">Cotações ao vivo</h2>
        <div className="grid grid-cols-3 gap-3">
          {["USDBRL", "EURBRL", "BTCBRL"].map((moeda) => {
            const label =
              moeda === "USDBRL" ? "USD" : moeda === "EURBRL" ? "EUR" : "BTC";
            const dado = cotacoes?.[moeda];
            const positivo = dado && parseFloat(dado.pctChange) >= 0;
            return (
              <div
                key={moeda}
                className="bg-gray-800 rounded-xl p-3 text-center"
              >
                <p className="text-gray-400 text-xs">{label}</p>
                {dado ? (
                  <>
                    <p className="text-white font-bold text-sm mt-1">
                      {moeda === "BTCBRL"
                        ? parseFloat(dado.bid).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            maximumFractionDigits: 0,
                          })
                        : parseFloat(dado.bid).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </p>
                    <p
                      className={`text-xs mt-1 ${positivo ? "text-green-400" : "text-red-400"}`}
                    >
                      {positivo ? "+" : ""}
                      {dado.pctChange}%
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-xs mt-2">...</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 bg-gray-800 rounded-2xl p-4">
        <h2 className="text-white font-semibold mb-3">
          Dólar — últimos 7 dias
        </h2>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={historicoUSD}>
            <XAxis
              dataKey="dia"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={["auto", "auto"]} hide />
            <Tooltip
              contentStyle={{
                background: "#1f2937",
                border: "none",
                borderRadius: 8,
                color: "#fff",
              }}
              formatter={(v) => [`R$ ${v.toFixed(2)}`, "USD"]}
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

      <section className="mt-6">
        <h2 className="text-white font-semibold mb-3">Extrato</h2>
        <div className="flex flex-col gap-2">
          {transacoes.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <div>
                <p className="text-white text-sm font-medium">{t.nome}</p>
                <p className="text-gray-400 text-xs">{t.data}</p>
              </div>
              <p
                className={`font-bold text-sm ${t.tipo === "entrada" ? "text-green-400" : "text-red-400"}`}
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
  );
}

export default Dashboard;
