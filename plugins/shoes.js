let handler = async (m, { args, conn }) => {
  if (!args.length) {
    return m.reply('📌 Scrivi il nome di una scarpa!\n\nEsempio: `.listino Nike Dunk Low Panda`');
  }

  const query = encodeURIComponent(args.join(" "));
  const url = `https://sneaks-api.onrender.com/search/${query}`;

  try {
    let res = await fetch(url);
    if (!res.ok) throw 'Errore fetch';
    let data = await res.json();

    if (!data.length) return m.reply("❌ Nessun prodotto trovato!");

    const shoe = data[0];
    const prezzo = shoe.retailPrice ? `💸 Prezzo Retail: €${shoe.retailPrice}` : '💸 Prezzo non disponibile';

    const messaggio = `👟 *${shoe.shoeName}*\n${prezzo}\n🔗 ${shoe.link}`;

    await conn.sendMessage(m.chat, {
      image: { url: shoe.thumbnail },
      caption: messaggio
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("⚠️ Errore nel recupero dei dati. Riprova.");
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <nome scarpa>'];
handler.tags = ['shop', 'utility'];
export default handler;