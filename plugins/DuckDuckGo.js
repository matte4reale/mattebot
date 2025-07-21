let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('❗ Scrivi cosa cercare\nEsempio: *.apiimg ferrari*');

  try {
    const res1 = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(text)}`);
    const html = await res1.text();
    const vqd = html.match(/vqd='([\d-]+)'/)?.[1];
    if (!vqd) throw '❌ Errore ottenendo token vqd';

    const res2 = await fetch(`https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(text)}&vqd=${vqd}&f=,,,&p=1`);
    const data = await res2.json();
    const immagini = data.results?.slice(0, 10);

    if (!immagini || immagini.length === 0) throw '❗ Nessuna immagine trovata';

    for (let img of immagini) {
      await conn.sendMessage(m.chat, {
        image: { url: img.image },
        caption: `🖼️ *${text.trim()}*\n🔗 ${img.url}`
      }, { quoted: m });
    }
  } catch (err) {
    console.error(err);
    m.reply('⚠️ Errore durante la ricerca immagini.');
  }
};

handler.command = ['apiimg'];
handler.help = ['apiimg <termine>'];
handler.tags = ['tools'];

export default handler;