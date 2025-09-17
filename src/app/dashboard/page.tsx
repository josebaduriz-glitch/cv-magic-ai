// src/app/dashboard/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { db } from '@/db/client';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function Dashboard() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <p>Necesitas iniciar sesión.</p>;
  }

  const rows = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id));

  const profile = rows[0];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Hola {profile?.fullName ?? user.email}
      </h1>
      <p className="opacity-70">
        Onboarded: {String(profile?.onboarded)}
      </p>
    </div>
  );
}
