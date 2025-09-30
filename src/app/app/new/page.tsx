'use client';

import { useMemo, useRef, useState } from 'react';

export default function NewCVPage() {
  const [name, setName] = useState('Tu Nombre');
  const [title, setTitle] = useState('Puesto deseado / Especialidad');
  const [summary, setSummary] = useState('Resumen breve y directo con tus logros clave y propuesta de valor.');
  const [email, setEmail] = useState('tu@email.com');
  const [phone, setPhone] = useState('+34 600 000 000');
  const [location, setLocation] = useState('Madrid, España');
  const [skills, setSkills] = useState('React, Node.js, SQL, Tailwind, AWS');
  const [experience, setExperience] = useState(`Empresa X — Desarrollador (2022–2024)
- Logro 1 cuantificado
- Logro 2 cuantificado

Empresa Y — Becario (2021–2022)
- Logro 1
- Logro 2`);
  const [loadingAI, setLoadingAI] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);
  const skillsArr = useMemo(
    () => skills.split(',').map(s => s.trim()).filter(Boolean),
    [skills]
  );

  const handleDownload = () => {
    window.print(); // imprime la vista → Guardar como PDF
  };

  const handleGenerateAI = async () => {
    try {
      setLoadingAI(true);
      const res = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          title,
          skills,
          experience,
        }),
      });
      if (!res.ok) throw new Error('Error al generar resumen');
      const data = await res.json();
      setSummary(data.summary);
    } catch (_e) {
      alert('No se pudo generar el resumen. Revisa tu clave de OpenAI en el servidor.');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
        {/* FORM */}
        <section className="space-y-6">
          <h1 className="text-2xl font-semibold">Completa tu CV</h1>
          <div className="grid grid-cols-2 gap-3">
            <input className="col-span-2 rounded border p-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre completo" />
            <input className="col-span-2 rounded border p-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título profesional" />
            <textarea className="col-span-2 h-24 rounded border p-2" value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Resumen" />

            <div className="col-span-2 flex gap-2">
              <button
                onClick={handleGenerateAI}
                disabled={loadingAI}
                className="rounded bg-emerald-600 px-3 py-2 text-white"
                type="button"
              >
                {loadingAI ? 'Generando…' : 'Generar CV con IA (resumen)'}
              </button>
              <button onClick={handleDownload} className="rounded bg-blue-600 px-3 py-2 text-white" type="button">
                Descargar PDF
              </button>
            </div>

            <input className="rounded border p-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
            <input className="rounded border p-2" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Teléfono" />
            <input className="col-span-2 rounded border p-2" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Ubicación" />
            <input className="col-span-2 rounded border p-2" value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Habilidades (separadas por comas)" />
            <textarea className="col-span-2 h-32 rounded border p-2" value={experience} onChange={e=>setExperience(e.target.value)} placeholder="Experiencia (viñetas)" />
          </div>
        </section>

        {/* PREVIEW / PRINT */}
        <section className="lg:sticky lg:top-6">
          <div ref={printRef} className="resume A4 mx-auto w-[210mm] max-w-full bg-white p-10 shadow print:shadow-none">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-lg text-gray-600">{title}</p>
            <div className="mt-2 text-sm text-gray-600">{email} · {phone} · {location}</div>

            <h2 className="mt-6 text-xl font-semibold">Resumen</h2>
            <p className="mt-1 leading-relaxed text-gray-800 whitespace-pre-wrap">{summary}</p>

            <h2 className="mt-6 text-xl font-semibold">Habilidades</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {skillsArr.map((s, i) => (
                <li key={i} className="rounded-full border px-2 py-1 text-sm">{s}</li>
              ))}
            </ul>

            <h2 className="mt-6 text-xl font-semibold">Experiencia</h2>
            <pre className="mt-2 whitespace-pre-wrap leading-relaxed text-gray-800">{experience}</pre>
          </div>
        </section>
      </div>

      {/* estilos de impresión */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 12mm; }
          body { background: white !important; }
          .resume { box-shadow: none !important; }
          nav, .no-print { display:none !important; }
        }
      `}</style>
    </div>
  );
}
