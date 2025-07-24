import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike dunk low`');

  const query = args.join(' ').toLowerCase();

  try {
    // Chiamata API Sneaks
    const res = await fetch(`https://api.sneaks.app/v1/threads?limit=1&search=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Errore nella chiamata API');

    const data = await res.json();
    if (!data.results || data.results.length === 0) 
      return m.reply('🔍 Modello non trovato.');

    const shoe = data.results[0];
    // shoe contiene info tipo: shoe.name, shoe.image, shoe.marketplace_prices

    // Prendiamo il prezzo più basso da StockX se disponibile
    let price = 'Prezzo non disponibile';
    if (shoe.marketplace_prices && shoe.marketplace_prices.stockx && shoe.marketplace_prices.stockx.lowest_ask) {
      price = `${shoe.marketplace_prices.stockx.lowest_ask} $ (StockX)`;
    } else if (shoe.retailPrice) {
      price = `${shoe.retailPrice} $ (Prezzo retail)`;
    }

    const mess = `👟 *${shoe.name.toUpperCase()}*\n💸 Prezzo indicativo: *${price}*\n🔗 [Dettagli](${shoe.url})`;

    await conn.sendMessage(
      m.chat,
      { image: { url: shoe.image }, caption: mess },
      { quoted: m }
    );

  } catch (error) {
    console.error(error);
    return m.reply('❌ Si è verificato un errore durante la ricerca.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;