"use client";

import Link from "next/link";
import { Suspense } from "react";
import Messages from "./messages";

export default function Login() {
  return (
    <Suspense>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-background bg-green-500 hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Voltar
        </Link>

        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/api/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="exemplo@exemplo.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Senha
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-green-500 rounded px-4 py-2 text-white mb-2">
            Entrar
          </button>
          <button
            formAction="/api/auth/sign-up"
            className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
          >
            Registrar
          </button>
          <button
            formAction="/api/auth/sign-in-google"
            formNoValidate
            className="bg-blue-500 rounded px-4 py-2 text-white mb-2 mt-10"
          >
            Entrar com Google
          </button>
          <Messages />
        </form>
      </div>
    </Suspense>
  );
}
