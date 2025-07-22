let handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skipmap') {
    if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi!');
    if (!global.geoGame?.[m.chat]) return m.reply('❌ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono interrompere!');
    clearTimeout(global.geoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${global.geoGame[m.chat].risposta}*`, m);
    delete global.geoGame[m.chat];
    return;
  }

  if (text === '.mappa') {
    if (global.geoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!');

    const localita = [
      { luogo: 'parigi', url: 'https://raw.githubusercontent.com/learnbr/photos/main/parigi.jpg' },
      { luogo: 'roma', url: 'https://raw.githubusercontent.com/learnbr/photos/main/roma.jpg' },
      { luogo: 'new york', url: 'https://raw.githubusercontent.com/learnbr/photos/main/newyork.jpg' },
      { luogo: 'tokyo', url: 'https://raw.githubusercontent.com/learnbr/photos/main/tokyo.jpg' },
      { luogo: 'londra', url: 'https://raw.githubusercontent.com/learnbr/photos/main/londra.jpg' },
      { luogo: 'sydney', url: 'https://raw.githubusercontent.com/learnbr/photos/main/sydney.jpg' },
      { luogo: 'mosca', url: 'https://raw.githubusercontent.com/learnbr/photos/main/mosca.jpg' },
      { luogo: 'dubai', url: 'https://raw.githubusercontent.com/learnbr/photos/main/dubai.jpg' },
      { luogo: 'istanbul', url: 'https://raw.githubusercontent.com/learnbr/photos/main/istanbul.jpg' },
      { luogo: 'pechino', url: 'https://raw.githubusercontent.com/learnbr/photos/main/pechino.jpg' }
    ];

    const scelta = localita[Math.floor(Math.random() * localita.length)];

    global.geoGame = global.geoGame || {};
    global.geoGame[m.chat] = {
      risposta: scelta.luogo,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.geoGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! Risposta: *${scelta.luogo}*`, m);
          delete global.geoGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(m.chat, {
      image: { url: scelta.url },
      caption: '🌍 *Indovina la località!* Hai 60 secondi.'
    }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const game = global.geoGame?.[m.chat];
  if (!game || m.key.fromMe) return;
  const text = m.text?.toLowerCase().trim();
  if (!text) return;
  if (text === game.risposta) {
    clearTimeout(game.timeout);
    const timeTaken = Math.round((Date.now() - game.startTime) / 1000);
    const reward = Math.floor(Math.random() * 50) + 50;
    const exp = 100;

    await conn.reply(m.chat, `
✅ *Corretto!*
📍 Luogo: ${game.risposta}
⏱️ Tempo: ${timeTaken}s
🎁 Ricompensa: ${reward} 💰 + ${exp} 🆙 EXP
`, m);
    delete global.geoGame[m.chat];
  }
};

handler.help = ['mappa','skipmap'];
handler.tags = ['game'];
handler.command = ['mappa','skipmap'];

export default handler;