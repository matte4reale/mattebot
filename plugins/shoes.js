const API_KEY = 'sd_XjZvL6MhwRJrgpLLrGCHidCSU90cFrHu'; // <-- Inserisci la tua vera API key

const API_BASE = 'https://api.kicks.dev/v3/stockx/products';

async function cercaScarpa(query) {
  try {
    const res = await fetch(`${API_BASE}?search=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: API_KEY
      }
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const data = await res.json();
    if (!data.products || data.products.length === 0) return null;

    return data.products[0]; // restituisce la prima scarpa trovata
  } catch (err) {
    console.error('Errore API:', err);
    throw err;
  }
}

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Usa: `.listino <scarpa>`');

  const query = args.join(' ');
  try {
    const scarpa = await cercaScarpa(query);
    if (!scarpa) return m.reply('🔍 Nessuna scarpa trovata.');

    const caption = `👟 *${scarpa.name}*\n💸 Retail: ${scarpa.retailPrice} ${scarpa.currency}\n🔗 ${scarpa.url}`;
    await conn.sendMessage(m.chat, {
      image: { url: scarpa.image.original },
      caption
    }, { quoted: m });

  } catch (e) {
    m.reply('❌ Errore nella ricerca con KicksDB API.');
  }
};

handler.command = /^listino$/i;
export default handler;