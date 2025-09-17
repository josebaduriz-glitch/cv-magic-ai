'use client';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const supabase = supabaseBrowser();
    const redirectBase =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin; // 👈 fija dominio

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${redirectBase}/auth/callback` }, // 👈 SIEMPRE /auth/callback
    });

    if (error) setMsg(error.message);
    else setMsg('Revisa tu email para el enlace mágico.');
    setLoading(false);
  }

  return (
    <form onSubmit={handleLogin} className="mx-auto max-w-md p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Entrar</h1>
      <input className="w-full border p-3 rounded" required type="email"
        value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" />
      <button disabled={loading} className="border rounded px-4 py-2">
        {loading ? 'Enviando...' : 'Entrar con Magic Link'}
      </button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
