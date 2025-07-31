const handler = async (m, { conn }) => {
  const messaggio = `🔍 *Cerca sul web*

Ciao! Oggi è il compleanno di *ChatUnity*!
È una collaborazione esclusiva con WhatsApp.

Quando avrai mandato questo messaggio a 20 persone,  
la spunta ✅ diventerà verde 💚  
e riceverai risposte illimitate e intelligenza potenziata!

📎 Scopri tutto qui: https://chatunitycenter.netlify.app/`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true
    }
  }, { quoted: m });
};

handler.command = /^\.chatunity$/i;
export default handler;