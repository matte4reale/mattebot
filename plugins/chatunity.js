let handler = async (m, { conn }) => {
  const messaggio = `💚 *ChatUnity - Il miglior bot WhatsApp!*

⚡ Veloce, stabile e personalizzabile.
🌐 Visita il sito ufficiale:
https://chatunitycenter.netlify.app`;

  await conn.sendMessage(m.chat, {
    text: messaggio
  }, { quoted: m });
};

handler.command = /^\.haramino$/i;
handler.help = ['.haramino'];
handler.tags = ['info'];

export default handler;