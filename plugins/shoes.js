import fetch from 'node-fetch';

const API_BASE = 'https://api.sneaksapp.info'; // Cambia con l'URL reale dove ospi Sneaks‑API se self‑hosted

async function cercaSneaker(query) {
  const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}&limit=1`);
  if (!res.ok) throw new Error('API error ' + res.status);
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  return data.results[0];
}

async function getPrezziPerTaglia(styleID) {
  const res = await fetch(`${API_BASE}/prices/${encodeURIComponent(styleID)}`);
  if (!res.ok) throw new Error('API price error ' + res.status);
  const data = await res.json();
  return data.price_map; // mappa taglia → prezzo
}

let handler = async (m, { args, conn }) => {
  if (args.length < 2) 
    return m.reply('❗ Usa `.listino <modello> <taglia>` es. `.listino nike jordan 1 42`');

  const taglia = args.pop();
  const query = args.join(' ');

  if (isNaN(taglia) || taglia < 36 || taglia > 44) 
    return m.reply('❗ Taglia valida da 36 a 44.');

  try {
    const shoe = await cercaSneaker(query);
    if (!shoe) return m.reply('🔍 Modello non trovato.');

    const prezziMap = await getPrezziPerTaglia(shoe.styleID);
    const prezzo = prezziMap && prezziMap[taglia] ? `${prezziMap[taglia]} €` : 'Prezzo non disponibile';

    const caption = 
      `👟 *${shoe.name}*\n` +
      `👞 Taglia: *${taglia}*\n` +
      `💸 Prezzo: *${prezzo}*\n` +
      `🔗 Link: ${shoe.url}`;

    await conn.sendMessage(
      m.chat,
      { image: { url: shoe.image }, caption },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    return m.reply('❌ Errore durante la ricerca con Sneaks‑API.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello> <taglia>'];
handler.tags = ['shop'];
export default handler;