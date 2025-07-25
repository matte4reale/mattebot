import fetch from 'node-fetch';

const API_KEY = 'sd_XjZvL6MhwRJrgpLLrGCHidCSU90cFrHu';
const API_BASE = 'https://api.kicks.dev/v1';

async function cercaScarpa(query) {
  const res = await fetch(`${API_BASE}/sneakers?search=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  if (!res.ok) throw new Error('Errore API: ' + res.status);
  const data = await res.json();
  if (!data.sneakers || data.sneakers.length === 0) return null;
  return data.sneakers[0];
}

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Usa: `.listino <scarpa>`');
  const query = args.join(' ');
  try {
    const scarpa = await cercaScarpa(query);
    if (!scarpa) return m.reply('🔍 Nessuna trovata.');

    const caption = `👟 *${scarpa.name}*\n💸 Retail: ${scarpa.retailPrice} ${scarpa.currency || 'USD'}\n🔗 Link: ${scarpa.url}`;
    await conn.sendMessage(m.chat, { image: { url: scarpa.media.imageUrl }, caption }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('❌ Errore nella ricerca con KicksDB API.');
  }
};

handler.command = /^listino$/i;
export default handler;