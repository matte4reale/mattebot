let handler = async (m, { conn }) => {
  const game = global.geoGame?.[m.chat];
  if (!game) return;

  const risposta = m.text.trim();
  if (risposta.toLowerCase() === game.risposta.toLowerCase()) {
    clearTimeout(game.timeout);
    await conn.sendMessage(m.chat, { text: `✅ Corretto! Era *${game.risposta}*! 🎉` });
    delete global.geoGame[m.chat];
  } else {
    await conn.sendMessage(m.chat, { text: `❌ No, prova ancora!` });
  }
};

handler.command = /^guess$/i;
export default handler;