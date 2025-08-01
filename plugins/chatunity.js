let handler = async (m, { conn }) => {
  const testo = `╭───〔  💚 *ChatUnity* 💚  〕───⬣
│
│  🔰 *Il miglior bot WhatsApp*
│  ⚡ Veloce, personalizzabile e gratis
│
│  🌐 *Visita il sito ufficiale:*
│  👉 https://chatunitycenter.netlify.app
│
╰──────────────⬣`;

  await conn.sendMessage(m.chat, {
    text: testo,
    footer: 'Premi il link per aprire ChatUnity!',
    buttons: [
      {
        buttonId: `.aiuto`,
        buttonText: { displayText: '📘 Aiuto' },
        type: 1
      },
      {
        buttonId: `.menu`,
        buttonText: { displayText: '📋 Menu' },
        type: 1
      }
    ],
    headerType: 1
  }, { quoted: m });
};

handler.command = /^\.chatunity$/i;
handler.help = ['.chatunity'];
handler.tags = ['info'];

export default handler;