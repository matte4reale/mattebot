let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('❗ Scrivi cosa cercare\nEsempio: *.apiimg ferrari*');

  try {
    const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(text)}&form=HDRSC2`);
    const html = await res.text();

    const matches = [...html.matchAll(/"murl":"(https:\/\/[^"]+)"/g)];
    const urls = matches.slice(0, 10).map(x => x[1]);

    if (urls.length === 0) throw 'Nessuna immagine trovata.';

    for (const url of urls) {
      await conn.sendMessage(m.chat, {
        image: { url },
        caption: `🔗 ${url}`
      }, { quoted: m });
    }

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Errore durante la ricerca immagini.');
  }
};

handler.command = ['apiimg'];
handler.help = ['apiimg <termine>'];
handler.tags = ['tools'];

export default handler;