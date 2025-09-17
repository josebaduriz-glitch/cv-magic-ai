// src/app/auth/callback/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('redirect_to') ?? '/dashboard';

  if (!code) {
    // si alguien entra sin code, vuelve al login
    return NextResponse.redirect(new URL('/login?error=missing_code', req.url));
  }

  // En Next 15, usa el almacén de cookies y pásalo envuelto como función
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  // Intercambia el code (PKCE) por la sesión y escribe las cookies
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, req.url)
    );
  }

  // Redirige ya logueado
  return NextResponse.redirect(new URL(next, req.url));
}
