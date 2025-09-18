// src/app/dashboard/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

// (opcional) Drizzle para el perfil
import { db } from '@/db/client';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

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
    // si falla DB, continuamos mostrando solo el email
  }

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">
        Hola {profile?.fullName ?? user.email}
      </h1>

      {/* Logout sin JS del cliente (form GET a route handler) */}
      <form action="/api/auth/logout" method="GET">
        <button className="rounded bg-red-600 px-4 py-2 text-white">
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
