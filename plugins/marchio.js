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
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bmw.png', marca: 'bmw', nazione: 'Germania' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/audi.png', marca: 'audi', nazione: 'Germania' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/toyota.png', marca: 'toyota', nazione: 'Giappone' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mercedes-benz.png', marca: 'mercedes-benz', nazione: 'Germania' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ford.png', marca: 'ford', nazione: 'USA' },
    ];

    const scelta = loghi[Math.floor(Math.random() * loghi.length)];
    const frasi = ['🚘 *INDOVINA IL LOGO!*', '🏁 *Che marca è questa?*', '🔍 *Riconosci questa auto?*'];
    const frase = frasi[Math.floor(Math.random() * frasi.length)];

    global.logoGame = global.logoGame || {};
    global.logoGame[m.chat] = {
      risposta: scelta.marca,
      rispostaOriginale: scelta.nazione,
      startTime: Date.now(),
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

    const userId = m.sender;
    global.userStats = global.userStats || {};
    if (!global.userStats[userId]) global.userStats[userId] = { coin: 0, xp: 0 };

    // Calcola tempo impiegato in secondi
    const timeTaken = Math.floor((Date.now() - game.startTime) / 1000);

    // Ricompense base
    const rewardBase = 10;
    const expBase = 5;

    // Bonus velocità: +5 coin se risposta entro 30 secondi
    const timeBonus = timeTaken <= 30 ? 5 : 0;

    const reward = rewardBase + timeBonus;
    const exp = expBase;

    // Aggiorna stats
    global.userStats[userId].coin += reward;
    global.userStats[userId].xp += exp;

    // Messaggio congratulazioni formattato
    let congratsMessage = `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🌍 *Nazione:* ${game.rispostaOriginale}
┃ ⏱️ *Tempo impiegato:* ${timeTaken}s
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 💰 euro ${timeBonus > 0 ? `(+${timeBonus} bonus velocità)` : ''}
┃ • ${exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯

> \`vare ✧ bot\`
`;

    await conn.reply(m.chat, congratsMessage, m);
    delete global.logoGame[m.chat];
  }
};

handler.help = ['brum', 'skiplogo'];
handler.tags = ['game'];
handler.command = ['brum', 'skiplogo'];

export default handler;