// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  // ...
  return <div>Dashboard</div>;
}
