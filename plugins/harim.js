let handler = async (m, { conn }) => {
  const messaggi = [
    "333 bot-            -Origin-Bot    Vare-Bot-            -Onix-Bot Turbo-Bot-         -Bixby-Bot",
    "333 bot   Origin-Bot   Vare-Bot   Onix-Bot   Turbo-Bot   Bixby-Bot",
    "333 bot        •Origin•        •Vare•        •Onix•        •Turbo•        •Bixby•",
    "333 𓆩bot𓆪        Origin✨      Vare🚀      Onix🔱      Turbo🔥      Bixby🧠",
    "   𓆩Chat⟣Unity𓆪         𓆩Bot𓆪       in arrivo...",
    "✦𓆩 ChatUnity Bot 𓆪✦",
    "★彡 ChatUnity ─ BOT 彡★",
    "🌐 CHATUNITY BOT 🌐"
  ];

  let prevMsgId = null;

  for (let i = 0; i < messaggi.length; i++) {
    if (prevMsgId) {
      await conn.sendMessage(m.chat, { delete: prevMsgId }); // cancella messaggio precedente
    }

    let sent = await conn.sendMessage(m.chat, { text: messaggi[i] }, { quoted: m });
    prevMsgId = sent.key;
    await new Promise(r => setTimeout(r, 1000)); // 1 secondo tra i messaggi
  }
};

handler.command = ['harim'];
export default handler;