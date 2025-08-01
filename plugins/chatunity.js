let handler = async (m, { conn }) => {
  const messaggio = `*ChatUnity - Il bot definitivo per la tua community!*

🔹 Automatizza risposte
🔹 Comandi personalizzati
🔹 Estetica avanzata e stabile

🌐 Visita il sito ufficiale:  
https://chatunitycenter.netlify.app`;

  await conn.sendMessage(m.chat, {
    image: {
      url: 'https://i.imgur.com/vKNSQhU.png' // 🔄 Puoi sostituirlo con un'immagine tua
    },
    caption: messaggio
  }, { quoted: m });
};

handler.command = /^\.chatunity$/i;
handler.help = ['.chatunity'];
handler.tags = ['info'];

export default handler;