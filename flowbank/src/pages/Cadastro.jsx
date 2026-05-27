import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleCadastro(e) {
    e.preventDefault();
    setErro("");
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });
    if (error) {
      setErro("Erro ao criar conta: " + error.message);
    } else {
      navigate("/onboarding");
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Junte-se a gente!
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleCadastro} className="space-y-6">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Nome completo:
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email:
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cpf"
                className="block text-sm/6 font-medium text-gray-100"
              >
                CPF:
              </label>
              <div className="mt-2">
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="senha"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Senha:
              </label>
              <div className="mt-2">
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Confirme sua senha:
              </label>
              <div className="mt-2">
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  required
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 ${
                    senha !== confirmarSenha && confirmarSenha
                      ? "outline-red-500"
                      : "outline-white/10"
                  } placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
                />
              </div>
            </div>

            {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Criar cadastro
              </button>
            </div>
            <p className="mt-10 text-center text-sm/6 text-gray-400">
              Já tem cadastro?{" "}
              <Link
                to="/"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Faça o login agora mesmo!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
