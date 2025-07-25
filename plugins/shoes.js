import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4`');

  const query = args.join(' ');
  const apiKey = 'sd_XjZvL6MhwRJrgpLLrGCHidCSU90cFrHu'; // <-- inserisci qui la tua chiave

  try {
    const res = await fetch(`https://api.kicks.dev/v1/sneakers?query=${encodeURIComponent(query)}&limit=1`, {
      headers: {
        'Authorization': apiKey
      }
    });

    const json = await res.json();
    const result = json?.results?.[0];

    if (!result) return m.reply('❌ Nessuna scarpa trovata.');

    const caption = `👟 *${result.name}*\n🆔 SKU: ${result.style_id || 'N/A'}\n💸 Prezzo: $${result.retail_price || 'N/A'}\n📅 Uscita: ${result.release_date || 'N/A'}\n🔗 ${result.resell_links?.stockx || 'Nessun link'}`;

    return conn.sendMessage(m.chat, {
      image: { url: result.thumbnail },
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