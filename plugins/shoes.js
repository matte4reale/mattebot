import fetch from 'node-fetch';

const API_BASE = 'https://api.sneakersapi.dev';

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Scrivi il nome di una scarpa...');
  const query = args.join(' ');

  try {
    const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}&limit=1`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    if (!data.results || data.results.length === 0) 
      return m.reply('🔍 Modello non trovato.');

    const shoe = data.results[0];
    const price = shoe.market_data?.market_average_eur
      ? `${shoe.market_data.market_average_eur} €`
      : (shoe.retail_usd ? `${shoe.retail_usd} $ (retail)` : 'Prezzo non disponibile');

    const mess = `👟 *${shoe.product_info.name.toUpperCase()}*\n💸 Prezzo indicativo: *${price}*\n🔗 [Dettagli](${shoe.market_data.market_url})`;

    await conn.sendMessage(m.chat, { image: { url: shoe.market_data.market_image }, caption: mess }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply('❌ Errore nella ricerca con SneakersAPI');
  }
};
handler.command = /^listino$/i;