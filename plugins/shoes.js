import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length) {
    return m.reply('❗ Usa: `.listino <modello scarpa>`\nEsempio: `.listino jordan 4 thunder`');
  }

  const query = args.join(' ');
  const apiUrl = `https://api.sneakersapi.dev/search?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();
    const s = json.data?.[0] || json.hits?.[0];

    if (!s) {
      return m.reply('❌ Nessuna scarpa trovata con questa query.');
    }

    const caption = `👟 *${s.title || s.name}*\n💸 Prezzo medio: $${s.market_data?.average_price || s.avg_price || 'N/A'}\n🆔 SKU: ${s.style_id || s.sku || 'N/A'}`;

    return conn.sendMessage(
      m.chat,
      {
        image: { url: s.image || s.market_image || s.thumbnail },
        caption
      },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    return m.reply('❌ Errore durante la richiesta all’API SneakersAPI.dev.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;