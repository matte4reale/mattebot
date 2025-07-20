let handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  // Comando per saltare il logo
  if (text === '.skiplogo') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
    if (!global.logoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono interrompere!');

    clearTimeout(global.logoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${global.logoGame[m.chat].risposta}*`, m);
    delete global.logoGame[m.chat];
    return;
  }

  // Comando principale .brum
  if (text === '.brum') {
    if (global.logoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!');
    global.cooldowns = global.cooldowns || {};
    const now = Date.now();
    const key = `logo_${m.chat}`;

    if (now - (global.cooldowns[key] || 0) < 10000) {
      const rem = Math.ceil((10000 - (now - global.cooldowns[key])) / 1000);
      return m.reply(`⏳ Aspetta ancora ${rem}s prima di giocare di nuovo.`);
    }
    global.cooldowns[key] = now;

    // Lista di loghi reali hostati (controllati)
    const loghi = [
      { url: 'https://i.ibb.co/7JznGDd/bmw.png', marca: 'bmw' },
      { url: 'https://i.ibb.co/9tcwQZj/toyota.png', marca: 'toyota' },
      { url: 'https://i.ibb.co/pK0vPjw/ford.png', marca: 'ford' },
      { url: 'https://i.ibb.co/3sQjyBr/audi.png', marca: 'audi' },
      { url: 'https://i.ibb.co/YZ2Ffp6/mercedes.png', marca: 'mercedes' }
      // Altri da aggiungere qui...
    ];

    const scelta = loghi[Math.floor(Math.random() * loghi.length)];
    const frasi = [
      '🚘 *INDOVINA LA MARCA DAL LOGO!*',
      '🏁 *Che marca è questa?*',
      '🔍 *Riconosci questo logo?*'
    ];
    const frase = frasi[Math.floor(Math.random() * frasi.length)];

    global.logoGame = global.logoGame || {};
    global.logoGame[m.chat] = {
      risposta: scelta.marca,
      timeout: setTimeout(() => {
        if (global.logoGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! Risposta: *${scelta.marca}*`, m);
          delete global.logoGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(
      m.chat,
      {
        image: { url: scelta.url },
        caption: `${frase}\n⌛ Hai 60 secondi per rispondere!`
      },
      { quoted: m }
    );
  }
};

// Logica per controllare la risposta
handler.before = async (m, { conn }) => {
  const chat = m.chat;
  const game = global.logoGame?.[chat];
  if (!game) return;
  if (m.key.fromMe) return; // Ignora bot

  const text = m.text?.toLowerCase().trim();
  if (!text) return;

  if (text === game.risposta) {
    clearTimeout(game.timeout);
    conn.reply(chat, `✅ *RISPOSTA CORRETTA!* 🎉\nLa marca era: *${game.risposta}*`, m);
    delete global.logoGame[chat];
  }
};

handler.help = ['brum', 'skiplogo'];
handler.tags = ['game'];
handler.command = ['brum', 'skiplogo'];

export default handler;