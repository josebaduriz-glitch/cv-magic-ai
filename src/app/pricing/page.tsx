export const dynamic = 'force-static';

const STRIPE_LINK = process.env.NEXT_PUBLIC_STRIPE_LINK || '#';

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Precios</h1>
      <p className="mt-2 text-gray-600">Empieza gratis. Pasa a Pro cuando quieras.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Gratis</h2>
          <p className="mt-1 text-gray-600">1 plantilla · Descarga PDF</p>
          <p className="mt-6 text-3xl font-bold">0€</p>
          <a href="/app/new" className="mt-6 inline-block rounded border px-4 py-2">Empezar</a>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-1 text-gray-600">Plantillas premium + IA ampliada</p>
          <p className="mt-6 text-3xl font-bold">7,99€<span className="text-base font-normal"> / mes</span></p>
          <a href={STRIPE_LINK} target="_blank" className="mt-6 inline-block rounded bg-black px-4 py-2 text-white">
            Pagar con Stripe
          </a>
          <p className="mt-2 text-xs text-gray-500">Pago seguro. Sin complicaciones.</p>
        </div>
      </div>
    </main>
  );
}
