import { useNavigate } from "react-router-dom";

function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="sm:w-full sm:max-w-sm flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-3xl font-black text-white">
          F
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Bem-vindo ao FlowBank
          </h1>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Sua conta digital está pronta. Aqui você acompanha seu saldo,
            visualiza cotações em tempo real e controla suas transações — tudo
            em um só lugar.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3 mt-2">
          {[
            "💰 Saldo e extrato em tempo real",
            "📈 Cotações de moedas e Bitcoin",
            "🔒 Seus dados sempre protegidos",
          ].map((item) => (
            <div
              key={item}
              className="bg-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 text-left"
            >
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-2 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          Começar agora
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
