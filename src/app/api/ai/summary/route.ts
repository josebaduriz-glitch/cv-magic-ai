import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, title, skills, experience } = await req.json();

    const prompt = `
Eres un experto en redacción de CV. Escribe un resumen profesional breve (3-5 frases), claro, con logros cuantificados cuando sea posible.
Devuelve solo el texto del resumen, en español.

Nombre: ${name}
Puesto objetivo: ${title}
Habilidades: ${skills}
Experiencia (viñetas): 
${experience}
    `.trim();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Falta OPENAI_API_KEY en el servidor' }, { status: 500 });
    }

    // Llama a OpenAI Chat Completions (modelo ligero para velocidad/coste)
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Eres un asistente que redacta resúmenes profesionales concisos y orientados a impacto.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 180,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return NextResponse.json({ error: 'OpenAI error', details: err }, { status: 500 });
    }

    const data = await r.json();
    const summary = data.choices?.[0]?.message?.content?.trim() || '';

    return NextResponse.json({ summary });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 500 });
  }
}
