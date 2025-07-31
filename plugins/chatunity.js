let handler = async (m) => {
  let messaggio = `✨ *ChatUnity è il bot definitivo!*\n\nRisposte istantanee, intelligenza superiore e un’esperienza unica.\n\n🔍 *Cerca sul web*: https://chatunitycenter.netlify.app/`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    linkPreview: false,
  }, { quoted: m });
};

handler.command = /^chatunity$/i;
handler.help = ['chatunity'];
handler.tags = ['info'];

export default handler;