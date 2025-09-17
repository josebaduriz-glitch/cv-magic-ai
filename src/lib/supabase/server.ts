import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

type CookieSetOptions = CookieOptions;

export async function createSupabaseServerClient() {
  const cookieStore = await cookies(); // Next 15: async

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? null;
        },
        // En Server Components no podemos escribir cookies -> no-ops
        set(_n: string, _v: string, _o?: CookieSetOptions) {},
        remove(_n: string, _o?: CookieSetOptions) {},
      },
    }
  );
}
