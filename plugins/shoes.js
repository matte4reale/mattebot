import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Usa: `.listino <modello>`');

  const query = args.join(' ');
  const apiKey = '769f6632dc4007c00c32457208251ac8';  // inserisci la tua chiave gratuita qui

  try {
    const res = await fetch(`https://luckdata.io/api/sneaker-API/get?query=${encodeURIComponent(query)}`, {
      headers: { 'X-Luckdata-Api-Key': apiKey }
    });
    const json = await res.json();
    if (!json || !json.product) return m.reply('❌ Nessuna scarpa trovata.');

    const p = json.product;
    const caption = `👟 *${p.name}*\n💸 Prezzo: $${p.price || 'N/A'}\n🆔 SKU: ${p.styleId || p.sku || 'N/A'}`;

    await conn.sendMessage(m.chat, {
      image: { url: p.image || p.image_url },
      caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return m.reply('❌ Errore richiesta LuckData API.');
  }
};

handler.command = /^listino$/i;
export default handler;