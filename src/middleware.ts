// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  // Siempre empieza con un NextResponse que puedas devolver/modificar
  const res = NextResponse.next();

  try {
    // Cliente Supabase compatible con Middleware (Edge)
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { pathname } = req.nextUrl;

    // Protege rutas privadas (ajusta a tus rutas)
    if (!session && pathname.startsWith('/dashboard')) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect_to', pathname);
      return NextResponse.redirect(url);
    }

    return res; // deja pasar
  } catch {
    // En caso de error de runtime, NO rompas el sitio: fail-open
    return res;
  }
}

// Solo intercepta lo necesario; NO incluyas /auth/callback
export const config = {
  matcher: ['/dashboard/:path*'],
};
