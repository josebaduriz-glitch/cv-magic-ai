// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link'; // ⬅️ añade esto arriba

// (opcional) Drizzle si quieres leer el perfil
import { db } from '@/db/client';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function DashboardPage() {
  // 👇 PASO CLAVE: pasa una función ASÍNCRONA que devuelva las cookies
  const supabase = createServerComponentClient({
    cookies: async () => await cookies(),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // --- Opcional: leer perfil desde tu DB con Drizzle ---
  let profile: { fullName: string | null; onboarded: boolean | null } | null = null;
  try {
    const rows = await db
      .select({
        fullName: profiles.fullName,
        onboarded: profiles.onboarded,
      })
      .from(profiles)
      .where(eq(profiles.id, user.id));
    profile = rows[0] ?? null;
  } catch {
    // si falla DB, mostramos solo el email
  }

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">
        Hola {profile?.fullName ?? user.email}
      </h1>
      {profile && (
        <p className="opacity-70">Onboarded: {String(profile.onboarded)}</p>
      )}
      <link
        href="/api/auth/logout"
        className="inline-block mt-4 rounded bg-red-600 px-4 py-2 text-white"
      >
        Cerrar sesión
      </link>
    </div>
  );
}
