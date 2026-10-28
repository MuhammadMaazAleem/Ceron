
export const config = { runtime: 'edge' };

declare const process: {
  env: Record<string, string | undefined>;
};

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(request: Request): Promise<Response> {
  const allowed = [
    'https://ceron-five.vercel.app',
    'http://localhost:5173',
    'http://localhost:4173',
  ];

  // Allow requests from our production app, any Vercel preview deployment, and local dev
  const origin = request.headers.get('origin') || '';
  const host = request.headers.get('host') || '';
  const isVercel = origin.endsWith('.vercel.app') || host.endsWith('.vercel.app');
  const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1') || host.includes('localhost');
  const isAllowed = !origin || isVercel || isLocalhost || allowed.includes(origin);

  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': isAllowed ? (origin || '*') : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // 1. Try server environment variables (GROQ_API_KEY or VITE_GROQ_API_KEY)
  // 2. Fall back to Authorization header sent by client if server env is missing
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization') || '';
  const clientKey = authHeader.replace(/^Bearer\s+/i, '').trim();
  const apiKey =
    process.env.GROQ_API_KEY ||
    process.env.VITE_GROQ_API_KEY ||
    (clientKey.length > 20 && clientKey !== 'your_groq_api_key_here' ? clientKey : '');

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          'API key not configured. Please add GROQ_API_KEY in your Vercel Project Settings (Settings → Environment Variables).',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Forward to Groq with a 30-second timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await groqRes.json();
    return new Response(JSON.stringify(data), {
      status: groqRes.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    clearTimeout(timeout);
    const message = err instanceof Error ? err.message : 'Upstream request failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

