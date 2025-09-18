'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const supabase = createClientComponentClient();

    const redirectBase =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${redirectBase}/auth/callback`,
      },
    });

    if (error) setMsg(error.message);
    else setMsg('Te enviamos un enlace. Revisa tu correo.');
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3 border p-5 rounded">
        <h1 className="text-xl font-semibold">Entrar</h1>
        <input
          type="email"
          required
          className="w-full border p-2 rounded"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? 'Enviando…' : 'Entrar con Magic Link'}
        </button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>
    </div>
  );
}
