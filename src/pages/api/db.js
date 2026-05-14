// src/pages/api/db.js
export const prerender = false;

const SUPABASE_URL = 'https://ihcmbsvsfwakmmmymtxq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vtYwuPiGKz3fVql9532PmA_oy_JhxkE';

export async function POST({ request }) {
  try {
    const { action, email, limit } = await request.json();
    
    if (action === 'getUser') {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/ContractTrack?email=eq.${email}&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      const data = await res.json();
      return new Response(JSON.stringify(data[0] || { error: 'not found' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (action === 'createUser') {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/ContractTrack`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ email, limit_left: 10, is_blocked: false })
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (action === 'updateLimit') {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/ContractTrack?email=eq.${email}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limit_left: limit })
      });
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
