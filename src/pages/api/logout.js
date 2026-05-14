// src/pages/api/logout.js
export const prerender = false;

export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
