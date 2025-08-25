import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">¡Hola, {session.user.name || "usuario"}!</h1>
      <p className="text-slate-600 mt-2">Ya estás dentro del dashboard privado.</p>
    </main>
  );
}
