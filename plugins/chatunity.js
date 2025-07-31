let handler = async (m, { conn }) => {
  let testo = `✨ *ChatUnity è il bot definitivo!*\n\nRisposte istantanee, intelligenza superiore e un’esperienza unica.\n\n🌐 Premi il pulsante qui sotto per scoprire di più.`;

  await conn.sendMessage(m.chat, {
    text: testo,
    footer: 'ChatUnity Official',
    buttons: [
      {
        buttonId: 'https://chatunitycenter.netlify.app/',
        buttonText: { displayText: '🌐 Visita il sito' },
        type: 1
      }
    ],
    headerType: 1
  }, { quoted: m });
};

handler.command = /^chatunity$/i;
handler.help = ['chatunity'];
handler.tags = ['info'];

export default handler;