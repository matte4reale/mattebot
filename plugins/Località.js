let handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skipmap') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
    if (!global.mapGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono interrompere!');
    clearTimeout(global.mapGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${global.mapGame[m.chat].risposta}*`, m);
    delete global.mapGame[m.chat];
    return;
  }

  if (text === '.mappa') {
    if (global.mapGame?.[m.chat]) return m.reply('⚠️ C\'è già una partita in corso!');

    const nazioni = ['italia', 'francia', 'germania', 'brasile', 'usa', 'giappone', 'egitto', 'spagna', 'canada', 'russia'];
    const scelta = nazioni[Math.floor(Math.random() * nazioni.length)];

    global.mapGame = global.mapGame || {};
    global.mapGame[m.chat] = {
      risposta: scelta,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.mapGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! La risposta era: *${scelta}*`, m);
          delete global.mapGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(m.chat, {
      image: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png'
      },
      caption: '🗺️ *Indovina lo stato dalla mappa!*\nRispondi con il nome dello stato corretto.\n⌛ Hai 60 secondi.'
    }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const game = global.mapGame?.[m.chat];
  if (!game || m.key.fromMe) return;

  const text = m.text?.toLowerCase().trim();
  if (!text) return;

  if (text === game.risposta) {
    clearTimeout(game.timeout);
    const timeTaken = ((Date.now() - game.startTime) / 1000).toFixed(1);
    const reward = Math.floor(Math.random() * 100 + 100);
    const exp = Math.floor(Math.random() * 10 + 10);

    let congratsMessage = `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🗺️ *Stato:* ${game.risposta}
┃ ⏱️ *Tempo impiegato:* ${timeTaken}s
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 💰 euro
┃ • ${exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯

> \`vare ✧ bot\``;

    await conn.reply(m.chat, congratsMessage, m);
    delete global.mapGame[m.chat];
  }
};

handler.help = ['mappa','skipmap'];
handler.tags = ['game'];
handler.command = ['mappa','skipmap'];

export default handler;
