let handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skipmap') {
    if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi!');
    if (!global.geoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin o bot owner possono interrompere!');
    clearTimeout(global.geoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. Era: *${global.geoGame[m.chat].risposta}*`, m);
    delete global.geoGame[m.chat];
    return;
  }

  if (text === '.mappa') {
    if (global.geoGame?.[m.chat]) return m.reply('⚠️ C\'è già una partita attiva!');

    const immagini = [
      { città: 'tokyo', url: 'https://raw.githubusercontent.com/luigi0123/GeoGuessGame/main/tokyo.jpg' },
      { città: 'roma', url: 'https://raw.githubusercontent.com/luigi0123/GeoGuessGame/main/roma.jpg' },
      { città: 'parigi', url: 'https://raw.githubusercontent.com/luigi0123/GeoGuessGame/main/parigi.jpg' },
      { città: 'londra', url: 'https://raw.githubusercontent.com/luigi0123/GeoGuessGame/main/londra.jpg' },
      { città: 'new york', url: 'https://raw.githubusercontent.com/luigi0123/GeoGuessGame/main/newyork.jpg' },
      { città: 'sydney', url: 'https://raw.githubusercontent.com/luigi0123/GeoGuessGame/main/sydney.jpg' }
    ];

    const scelta = immagini[Math.floor(Math.random() * immagini.length)];
    const opzioni = shuffleArray([scelta.città, ...pickRandom(immagini.map(i => i.città).filter(c => c !== scelta.città), 4)]);

    global.geoGame = global.geoGame || {};
    global.geoGame[m.chat] = {
      risposta: scelta.città,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.geoGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! La risposta era: *${scelta.città}*`, m);
          delete global.geoGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(
      m.chat,
      {
        image: { url: scelta.url },
        caption: `🌍 *Indovina la città!*\nScegli tra le opzioni sotto ⬇️`,
        buttons: opzioni.map(c => ({ buttonId: `.risposta ${c}`, buttonText: { displayText: c }, type: 1 }))
      },
      { quoted: m }
    );
  }
};

handler.before = async (m, { conn }) => {
  const game = global.geoGame?.[m.chat];
  if (!game || m.key.fromMe || !m.text) return;

  const risposta = m.text.toLowerCase().trim();
  if (risposta === game.risposta) {
    clearTimeout(game.timeout);
    const timeTaken = ((Date.now() - game.startTime) / 1000).toFixed(1);
    const reward = Math.floor(Math.random() * 100 + 100);
    const exp = Math.floor(Math.random() * 10 + 10);

    await conn.reply(m.chat, `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🗺️ *Città:* ${game.risposta}
┃ ⏱️ *Tempo impiegato:* ${timeTaken}s
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 💰 euro
┃ • ${exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯`, m);

    delete global.geoGame[m.chat];
  }
};

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

handler.help = ['mappa', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'skipmap'];

export default handler;