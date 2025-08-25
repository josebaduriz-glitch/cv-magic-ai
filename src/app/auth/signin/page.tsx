"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="mt-6 w-full rounded-2xl border py-3"
      >
        Entrar con Google
      </button>
    </main>
  );
}
