let handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skiplogo') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
    if (!global.logoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono interrompere!');
    clearTimeout(global.logoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${global.logoGame[m.chat].risposta}*`, m);
    delete global.logoGame[m.chat];
    return;
  }

  if (text === '.brum') {
    if (global.logoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!');
    global.cooldowns = global.cooldowns || {};
    const now = Date.now(), key = `logo_${m.chat}`;
    if (now - (global.cooldowns[key] || 0) < 10000) {
      return m.reply(`⏳ Attendi ${Math.ceil((10000 - (now - global.cooldowns[key]))/1000)}s prima di riprovare.`);
    }
    global.cooldowns[key] = now;

    const loghi = [
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bmw.png', marca: 'bmw' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/audi.png', marca: 'audi' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/toyota.png', marca: 'toyota' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mercedes-benz.png', marca: 'mercedes-benz' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ford.png', marca: 'ford' },
    ];

    const scelta = loghi[Math.floor(Math.random() * loghi.length)];
    const frasi = ['🚘 *INDOVINA IL LOGO!*', '🏁 *Che marca è questa?*', '🔍 *Riconosci questa auto?*'];
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

    await conn.sendMessage(m.chat, { image: { url: scelta.url }, caption: `${frase}\n⌛ 60 secondi.` }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const game = global.logoGame?.[m.chat];
  if (!game || m.key.fromMe) return;
  const text = m.text?.toLowerCase().trim();
  if (!text) return;
  if (text === game.risposta) {
    clearTimeout(game.timeout);
    conn.reply(m.chat, `✅ *CORRETTO!* Era: *${game.risposta}*`, m);
    delete global.logoGame[m.chat];
  }
};

handler.help = ['brum','skiplogo'];
handler.tags = ['game'];
handler.command = ['brum','skiplogo'];
export default handler;