import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino jordan 4`');

  const query = args.join(' ');
  try {
    const res = await fetch(`https://sneakerapi-production.up.railway.app/api?sneaker=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!data || data.length === 0) return m.reply('❌ Nessuna scarpa trovata.');

    const s = data[0]; // Prima corrispondenza
    const caption = `👟 *${s.name}*\n💸 Prezzo: $${s.retail_price || 'N/A'}\n📅 Uscita: ${s.release_date || 'N/A'}\n🔗 StockX: ${s.url || 'N/A'}`;

    return conn.sendMessage(m.chat, {
      image: { url: s.image },
      caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return m.reply('❌ Errore durante la richiesta all’API.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;