"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, FileText, ShieldCheck, Zap, Globe, ArrowRight, Stars, Wand2, LayoutGrid, Languages } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-semibold text-lg">
            <Sparkles className="w-5 h-5" />
            CVMagic <span className="text-amber-500">AI</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:opacity-80">Características</a>
            <a href="#how" className="hover:opacity-80">Cómo funciona</a>
            <a href="#pricing" className="hover:opacity-80">Precios</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#demo" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl border bg-white hover:shadow">Probar demo</a>
            <a href="#pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black text-white hover:opacity-90">Empieza gratis <ArrowRight className="w-4 h-4"/></a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="text-4xl md:text-5xl font-bold tracking-tight">
            Crea <span className="underline decoration-amber-400 decoration-4 underline-offset-4">CVs y Cartas</span> con IA en segundos
          </motion.h1>
          <p className="mt-4 text-lg text-slate-600">Resultados profesionales, listos para ATS, en español o inglés. Ahorra horas de edición y postula con confianza.</p>
          <ul className="mt-6 space-y-2 text-slate-700">
            <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 mt-0.5"/> Adaptación al puesto y sector</li>
            <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 mt-0.5"/> Exporta a PDF y DOCX</li>
            <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 mt-0.5"/> Plantillas optimizadas por ATS</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="#demo" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-white hover:opacity-90">Probar gratis</a>
            <a href="#pricing" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border bg-white hover:shadow">Ver planes</a>
          </div>
          <p className="mt-3 text-xs text-slate-500">*Sin tarjeta en el plan gratuito</p>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 bg-amber-100/60 rounded-3xl blur-2xl"/>
          <div className="relative rounded-3xl border bg-white shadow-lg overflow-hidden">
            <div className="px-5 py-3 border-b flex items-center gap-2 text-slate-500"><LayoutGrid className="w-4 h-4"/> Vista previa</div>
            <div className="p-5 grid md:grid-cols-2 gap-5">
              <div className="rounded-xl border p-4 bg-slate-50">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><Wand2 className="w-4 h-4"/> Carta de presentación</div>
                <pre className="text-sm whitespace-pre-wrap">{`Estimado equipo,\nMe entusiasma postular al puesto de Analista de Datos...\n• SQL, Python, Power BI\n• +30% eficiencia en reportes\nSaludos,\nMaría`}</pre>
              </div>
              <div className="rounded-xl border p-4 bg-slate-50">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><FileText className="w-4 h-4"/> CV (resumen)</div>
                <ul className="text-sm list-disc pl-5">
                  <li>Perfil: orientado/a a resultados</li>
                  <li>Logro: reducción 30% tiempo de reporte</li>
                  <li>Stack: SQL · Python · BI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trust */}
      <section className="max-w-6xl mx-auto px-4 pb-2">
        <div className="text-center text-sm text-slate-500">Compatible con sistemas ATS populares</div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 opacity-70">
          {["Greenhouse","Lever","Workday","SAP SuccessFactors"].map((l) => (
            <div key={l} className="rounded-xl border p-3 text-center">{l}</div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon={<Stars className="w-5 h-5"/>} title="Texto impecable">
            Redacción clara y persuasiva con IA; ajusta tono y extensión al contexto.
          </Feature>
          <Feature icon={<ShieldCheck className="w-5 h-5"/>} title="Optimizado para ATS">
            Estructuras y palabras clave que superan filtros automatizados.
          </Feature>
          <Feature icon={<Languages className="w-5 h-5"/>} title="Multilenguaje">
            Genera documentos en español o inglés con un clic.
          </Feature>
          <Feature icon={<Zap className="w-5 h-5"/>} title="Rápido y simple">
            De formulario a documento listo en menos de 30 segundos.
          </Feature>
          <Feature icon={<Globe className="w-5 h-5"/>} title="Exportación fácil">
            Descarga en PDF/DOCX o copia al portapapeles para editar.
          </Feature>
          <Feature icon={<Wand2 className="w-5 h-5"/>} title="Plantillas premium">
            Diseños modernos listos para usar y personalizar.
          </Feature>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50/60 border-y">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold">¿Cómo funciona?</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Step n="1" title="Completa el formulario">Cuenta tu experiencia, el puesto y el estilo deseado.</Step>
            <Step n="2" title="Genera con IA">Obtén una carta y/o CV optimizados en segundos.</Step>
            <Step n="3" title="Descarga y postula">Exporta en PDF/DOCX y aplica a tus ofertas.</Step>
          </div>
        </div>
      </section>

      {/* Demo anchor */}
      <section id="demo" className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl border shadow-sm p-6 bg-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">Demo interactiva</h3>
              <p className="text-slate-600">Este bloque se integra con tu componente real o un iframe de tu app /dashboard.</p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-white">Abrir demo</a>
          </div>
          <div className="mt-5 h-64 rounded-xl border bg-slate-50 grid place-items-center text-slate-500">
            <span>Área de demo (embed)</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">Planes sencillos</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <PricingCard name="Gratis" price="0€" cta="Empezar" highlight={false} items={["1 documento de prueba","Copia al portapapeles","Sin tarjeta"]}/>
          <PricingCard name="Básico" price="5€/mes" cta="Suscribirme" highlight items={["Ilimitado","Exportar PDF/DOCX","2 idiomas"]}/>
          <PricingCard name="Pro" price="10€/mes" cta="Elegir Pro" highlight={false} items={["Plantillas premium","Historial y guardado","Soporte prioritario"]}/>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold">Lo que dicen nuestros usuarios</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {name:'Lucía', text:'Conseguí entrevistas en 1 semana. El CV quedó increíble.'},
              {name:'Javier', text:'Ahorra muchísimo tiempo. La carta sale lista para enviar.'},
              {name:'Elena', text:'Me encantó poder cambiar el tono y el idioma al instante.'},
            ].map((t, i)=> (
              <div key={i} className="rounded-2xl border p-5 bg-white shadow-sm">
                <div className="font-semibold">{t.name}</div>
                <p className="text-slate-600 mt-1">“{t.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <FAQ q="¿Necesito tarjeta para probar?" a="No. El plan gratuito permite generar un documento de muestra."/>
          <FAQ q="¿Puedo editar el resultado?" a="Sí. Puedes copiar/pegar o exportar y editar libremente."/>
          <FAQ q="¿Qué idiomas admite?" a="De salida: español e inglés."/>
          <FAQ q="¿Cómo funciona el pago?" a="Suscripciones seguras con Stripe; cancela cuando quieras."/>
        </div>
        <footer className="mt-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} CVMagic AI</footer>
      </section>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border shadow-sm p-6 bg-white">
      <div className="flex items-center gap-2 font-semibold"><span className="text-amber-500">{icon}</span>{title}</div>
      <p className="mt-2 text-slate-600">{children}</p>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-6 bg-white">
      <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-sm">{n}</div>
      <div className="mt-3 font-semibold">{title}</div>
      <p className="text-slate-600 mt-1">{children}</p>
    </div>
  );
}

function PricingCard({ name, price, items, cta, highlight }: { name: string; price: string; items: string[]; cta: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border shadow-sm p-6 bg-white ${highlight ? 'ring-2 ring-amber-400' : ''}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>
      <div className="text-3xl font-bold mt-2">{price}</div>
      <ul className="mt-4 space-y-2 text-slate-700">
        {items.map((f, i) => (
          <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 mt-0.5"/>{f}</li>
        ))}
      </ul>
      <button className="mt-5 w-full rounded-2xl bg-black text-white py-3">{cta}</button>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border p-5 bg-white">
      <div className="font-semibold">{q}</div>
      <div className="text-slate-600 mt-1">{a}</div>
    </div>
  );
}
