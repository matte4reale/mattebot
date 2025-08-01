let handler = async (m, { conn }) => {
  const testo = `╭───〔  💚 *ChatUnity* 💚  〕───⬣
│
│  🔰 *Il miglior bot WhatsApp!*
│  ⚡ Veloce, stabile e personalizzabile.
│
│  🌐 *Sito ufficiale:*
│  👉 https://chatunitycenter.netlify.app
│
╰──────────────⬣`;

  await conn.sendMessage(m.chat, {
    text: testo,
    footer: 'Premi il link o i pulsanti per esplorare!',
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

handler.command = /^\.haramino$/i;
handler.help = ['.haramino'];
handler.tags = ['info'];

export default handler;