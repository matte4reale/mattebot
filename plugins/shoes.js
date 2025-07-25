import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Scrivi il nome della scarpa. Esempio: `.listino jordan 1`');

  const query = args.join(' ');
  try {
    const res = await fetch(`https://api.sneakersapi.dev/search?query=${encodeURIComponent(query)}`);
    const json = await res.json();

    if (!json.data || !json.data.length) return m.reply('❌ Nessuna scarpa trovata.');

    const s = json.data[0]; // primo risultato
    const caption = `👟 *${s.title}*\n💸 Prezzo retail: $${s.retail_price || 'N/A'}\n📅 Uscita: ${s.release_date || 'N/A'}\n🔗 Link: ${s.link}`;

    await conn.sendMessage(m.chat, {
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