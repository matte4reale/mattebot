import fetch from 'node-fetch';

const COOLDOWN_MS = 5000; // 5 secondi cooldown
const lastCall = new Map();

async function cercaScarpaStockX(query) {
  const url = `https://stockx.com/api/browse?_search=${encodeURIComponent(query)}&page=1&resultsPerPage=1`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Errore StockX');
  const data = await res.json();

  if (!data.Products || data.Products.length === 0) return null;

  const p = data.Products[0];
  return {
    name: p.name,
    retailPrice: p.retailPrice,
    media: p.media,
    url: `https://stockx.com/${p.urlKey}`,
  };
}

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Usa: `.listino <nome scarpa>`');

  const now = Date.now();
  if (lastCall.has(m.sender) && now - lastCall.get(m.sender) < COOLDOWN_MS) {
    return m.reply('⏳ Attendi qualche secondo prima di fare un’altra ricerca.');
  }
  lastCall.set(m.sender, now);

  const query = args.join(' ');
  try {
    const scarpa = await cercaScarpaStockX(query);
    if (!scarpa) return m.reply('🔍 Nessuna scarpa trovata su StockX.');

    const caption = `👟 *${scarpa.name}*\n💸 Prezzo retail: ${scarpa.retailPrice} USD\n🔗 Link: ${scarpa.url}`;
    await conn.sendMessage(
      m.chat,
      { image: { url: scarpa.media.smallImageUrl || scarpa.media.thumbUrl }, caption },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    return m.reply('❌ Errore durante la ricerca su StockX. Riprova più tardi.');
  }
};

handler.command = /^listino$/i;
export default handler;