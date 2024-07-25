"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import tw from "tailwind-styled-components";

export default function Login() {
  const router = useRouter();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  async function handleGoogleLogin() {
    setIsLoadingGoogle(true);
    try {
      const res = await axios.post("/api/auth/sign-in-google");
      router.push(res.data.url);
    } catch (error) {
      toast.error("Erro ao tentar logar com Google");
      setIsLoadingGoogle(false);
    }
  }

  async function handleEmailLogin(event: any) {
    event.preventDefault();
    setIsLoadingEmail(true);

    try {
      const { data } = await axios.post("/api/auth/sign-in", {
        email: event.target.form.email.value,
        password: event.target.form.password.value,
      });
      router.push(data.url);
    } catch (error) {
      toast.error("Erro ao tentar logar com email");
      setIsLoadingEmail(false);
    }
  }

  async function handleRegister(event: any) {
    event.preventDefault();
    setIsLoadingRegister(true);
    try {
      await axios.post("/api/auth/sign-up", {
        name: event.target.form.name.value,
        email: event.target.form.email.value,
        password: event.target.form.password.value,
      });
      toast.success("Conta criada com sucesso");
      setIsLoadingRegister(false);
      setIsLoginForm(true);
    } catch (error) {
      toast.error("Erro ao tentar registrar com email");
      setIsLoadingRegister(false);
    }
  }

  return (
    <AuthContainer>
      {isLoginForm ? (
        <LoginForm>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="exemplo@exemplo.com" required />
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <p className="text-gray-500">
            Não tem uma conta?{" "}
            <button
              className="text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginForm(false);
              }}
            >
              Cadastrar
            </button>
          </p>
          <ButtonPrimary onClick={handleEmailLogin}>
            {isLoadingEmail ? "Carregando..." : "Entrar"}
          </ButtonPrimary>
        </LoginForm>
      ) : (
        <RegisterForm>
          <Label htmlFor="name">Nome</Label>
          <Input name="name" placeholder="João" required />
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="exemplo@exemplo.com" required />
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <p className="text-gray-500">
            Já tem uma conta?{" "}
            <button
              className="text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginForm(true);
              }}
            >
              Entrar
            </button>
          </p>
          <ButtonPrimary onClick={handleRegister}>
            {isLoadingRegister ? "Carregando..." : "Cadastrar"}
          </ButtonPrimary>
        </RegisterForm>
      )}
      <ButtonGoogle onClick={handleGoogleLogin}>
        {isLoadingGoogle ? "Carregando..." : "Entrar com Google"}
      </ButtonGoogle>
    </AuthContainer>
  );
}

const AuthContainer = tw.div`flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2`;
const LoginForm = tw.form`flex flex-col w-full justify-center gap-2 text-foreground`;
const RegisterForm = tw.form`flex flex-col w-full justify-center gap-2 text-foreground`;
const Label = tw.label`text-md`;
const Input = tw.input`rounded-md px-4 py-2 bg-inherit border mb-6`;
const ButtonPrimary = tw.button`bg-green-500 hover:bg-green-600 rounded px-4 py-2 text-white mb-2`;
const ButtonGoogle = tw.button`bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white mb-2 w-full`;
