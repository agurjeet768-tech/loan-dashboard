// src/pages/api/auth.js
export const prerender = false;

export async function POST({ request }) {
  try {
    const { action, email, password } = await request.json();
    
    const SUPABASE_URL = 'https://ihcmbsvsfwakmmmymtxq.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_vtYwuPiGKz3fVql9532PmA_oy_JhxkE';
    
    let endpoint = '';
    let body = {};
    
    if (action === 'login') {
      endpoint = `${SUPABASE_URL}/auth/v1/token?grant_type=password`;
      body = { email, password };
    } else if (action === 'register') {
      endpoint = `${SUPABASE_URL}/auth/v1/signup`;
      body = { email, password };
    } else if (action === 'session') {
      endpoint = `${SUPABASE_URL}/auth/v1/user`;
    }
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
