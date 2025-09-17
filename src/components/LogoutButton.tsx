'use client';

import { supabaseBrowser } from '@/lib/supabase/client';

export default function LogoutButton() {
  const onClick = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Cerrar sesión
    </button>
  );
}
