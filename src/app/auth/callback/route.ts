import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

type CookieSetOptions = CookieOptions;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/dashboard';

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', req.url));
  }

  // preparamos la respuesta de redirección para poder ESCRIBIR cookies
  const res = NextResponse.redirect(new URL(next, req.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // en route handler no necesitamos LEER cookies para este flujo
        get: (_name: string) => null,
        set: (name: string, value: string, options?: CookieSetOptions) => {
          res.cookies.set({ name, value, ...(options ?? {}) });
        },
        remove: (name: string, options?: CookieSetOptions) => {
          res.cookies.set({ name, value: '', ...(options ?? {}) });
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, req.url)
    );
  }

  return res;
}
