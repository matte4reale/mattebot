let handler = async (m, { conn }) => {
  const frames = [
    "🔵 BOT SYSTEM STARTING...",
    "🟢 SYSTEM CHECKING: OK",
    "🟡 LOADING MODULES...",
    "🟣 CONNECTING TO NODES...",
    "🌐 SYNCING...",
    "🔴 FINALIZING...",
    "🌍  CHATUNITY BOT 🌍"
  ];

  let msg = await conn.sendMessage(m.chat, { text: frames[0] }, { quoted: m });

  for (let i = 1; i < frames.length; i++) {
    await new Promise(res => setTimeout(res, 1000));
    try {
      await conn.sendMessage(m.chat, {
        text: frames[i],
        edit: msg.key // ← solo se il tuo bot supporta questo!
      });
    } catch (e) {
      // fallback: elimina e reinvia (opzionale se non supporta edit)
      await conn.sendMessage(m.chat, { delete: msg.key });
      msg = await conn.sendMessage(m.chat, { text: frames[i] });
    }
  }
};

handler.command = ['harim'];
export default handler;