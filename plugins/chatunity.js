let handler = async (m) => {
  const testoPromo = `✨ *ChatUnity è il bot definitivo!*\nRisposte istantanee, intelligenza superiore e un’esperienza unica. Entra nella nuova era.`;

  const link = 'https://chatunitycenter.netlify.app/';

  const messaggio = `${testoPromo}\n\n🔎 *Scopri di più sul web:*\n➡️ ${link}`;

  await m.reply(messaggio);
};

handler.command = /^chatunity$/i;
handler.help = ['chatunity'];
handler.tags = ['info'];

export default handler;