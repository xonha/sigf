"use client";

import tw from "tailwind-styled-components";

export default function Login() {
  return (
    <Container>
      <Form action="/api/auth/sign-in" method="post">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="exemplo@exemplo.com" required />
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <ButtonPrimary>Entrar</ButtonPrimary>
        <ButtonSecondary formAction="/api/auth/sign-up">
          Registrar
        </ButtonSecondary>
        <ButtonGoogle formAction="/api/auth/sign-in-google" formNoValidate>
          Entrar com Google
        </ButtonGoogle>
      </Form>
    </Container>
  );
}

const Form = tw.form`flex-1 flex flex-col w-full justify-center gap-2 text-foreground`;
const Label = tw.label`text-md`;
const Input = tw.input`rounded-md px-4 py-2 bg-inherit border mb-6`;
const ButtonPrimary = tw.button`bg-green-500 rounded px-4 py-2 text-white mb-2`;
const ButtonSecondary = tw.button`border border-gray-700 rounded px-4 py-2 text-black mb-2`;
const ButtonGoogle = tw.button`bg-blue-500 rounded px-4 py-2 text-white mb-2 mt-10`;
const Container = tw.div`flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2`;
