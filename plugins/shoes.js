import fetch from 'node-fetch';

const API_BASE = 'https://api.sneakersapi.dev';

async function cercaScarpa(query) {
  const res = await fetch(`${API_BASE}/v1/products/search?query=${encodeURIComponent(query)}&limit=1`);
  if (!res.ok) throw new Error('Errore API');
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  return data.results[0];
}

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Usa: `.listino <nome scarpa>`');
  const query = args.join(' ');
  try {
    const shoe = await cercaScarpa(query);
    if (!shoe) return m.reply('🔍 Nessuna scarpa trovata.');

    const caption = `👟 *${shoe.product_name}*\n📅 Release: ${shoe.release_date || 'N/D'}\n` +
                    `💸 Prezzo netto: ${shoe.retail_price || 'N/D'}€\n🔗 Link: ${shoe.product_url}`;

    await conn.sendMessage(
      m.chat,
      { image: { url: shoe.image_url }, caption },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    return m.reply('❌ Errore durante la ricerca con SneakersAPI.dev.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['tools'];
export default handler;