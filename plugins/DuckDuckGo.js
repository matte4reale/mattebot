import fetch from 'node-fetch';

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('📸 Scrivi cosa vuoi cercare!\nEsempio: `.apiimg lamborghini`');

  const query = encodeURIComponent(text.trim());

  try {
    // Ottieni il token di sessione vqd necessario per DuckDuckGo
    const tokenRes = await fetch(`https://duckduckgo.com/?q=${query}`);
    const tokenHtml = await tokenRes.text();
    const vqdMatch = tokenHtml.match(/vqd='([\d-]+)'/);

    if (!vqdMatch) throw '❌ Impossibile ottenere il token di ricerca';

    const vqd = vqdMatch[1];

    const apiRes = await fetch(`https://duckduckgo.com/i.js?l=it-it&o=json&q=${query}&vqd=${vqd}&f=,,,&p=1`);
    const apiData = await apiRes.json();

    if (!apiData.results || apiData.results.length === 0) {
      return m.reply('❗ Nessuna immagine trovata.');
    }

    const results = apiData.results.slice(0, 10); // Prendi max 10 immagini

    for (let img of results) {
      await conn.sendMessage(m.chat, {
        image: { url: img.image },
        caption: `🖼️ ${text}\n🔗 ${img.url}`,
      }, { quoted: m });
    }

  } catch (err) {
    console.error(err);
    m.reply('⚠️ Errore durante la ricerca immagini.');
  }
};

handler.help = ['apiimg <query>'];
handler.tags = ['tools'];
handler.command = /^apiimg$/i;

export default handler;