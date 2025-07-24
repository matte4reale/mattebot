import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike dunk low`');

  const query = args.join(' ');

  try {
    const url = `https://api.sneakersapi.dev/search?query=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error('❌ Errore API sneakersapi.dev:', res.status);
      return m.reply('⚠️ Errore nella richiesta a SneakersAPI.');
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0)
      return m.reply('🔍 Modello non trovato.');

    const shoe = data.results[0];

    const name = shoe.product_info?.name || 'Modello sconosciuto';
    const image = shoe.market_data?.market_image || shoe.image_url;
    const urlDettaglio = shoe.market_data?.market_url || 'https://stockx.com/';
    const price = shoe.market_data?.market_average_eur
      ? `${shoe.market_data.market_average_eur} €`
      : (shoe.retail_usd ? `${shoe.retail_usd} $ (retail)` : 'Prezzo non disponibile');

    const mess = `👟 *${name.toUpperCase()}*\n💸 Prezzo indicativo: *${price}*\n🔗 [Dettagli](${urlDettaglio})`;

    await conn.sendMessage(
      m.chat,
      { image: { url: image }, caption: mess },
      { quoted: m }
    );

  } catch (error) {
    console.error('❌ Errore handler listino:', error);
    return m.reply('❌ Errore durante la ricerca della scarpa.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;