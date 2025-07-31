let handler = async (m, { conn }) => {
  const messaggio = `💚 *ChatUnity è il miglior bot WhatsApp!*
  
Con funzionalità avanzate, risposte rapide e un design elegante.

🔍 *Scopri tutte le novità e aggiornamenti qui:*
https://chatunitycenter.netlify.app`;

  await conn.sendMessage(m.chat, {
    text: messaggio
  }, { quoted: m });
};

handler.command = /^\.chatunity$/i;
handler.help = ['.chatunity'];
handler.tags = ['info'];

export default handler;