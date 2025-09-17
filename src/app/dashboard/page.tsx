import { createSupabaseServerClient } from '@/lib/supabase/server';
import { db } from '@/db/client';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient(); // 👈 await
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // server redirect simple
    return (
      <div className="p-6">
        <p>Necesitas iniciar sesión.</p>
        <a className="underline" href="/login">Ir al login</a>
      </div>
    );
  }

  const rows = await db.select().from(profiles).where(eq(profiles.id, user.id));
  const profile = rows[0];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">
        Hola {profile?.fullName ?? user.email}
      </h1>
      <p className="opacity-70">Onboarded: {String(profile?.onboarded)}</p>

      {/* Botón de logout (cliente) */}
      <LogoutButton />
    </div>
  );
}
