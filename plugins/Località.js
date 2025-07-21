import fs from 'fs';

let handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skipmap') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
    if (!global.geoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono interrompere!');
    clearTimeout(global.geoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${global.geoGame[m.chat].risposta}*`, m);
    delete global.geoGame[m.chat];
    return;
  }

  if (text === '.indovinalocalità') {
    if (global.geoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!');
    global.cooldowns = global.cooldowns || {};
    const now = Date.now(), key = `geo_${m.chat}`;
    if (now - (global.cooldowns[key] || 0) < 15000) {
      return m.reply(`⏳ Attendi ${Math.ceil((15000 - (now - global.cooldowns[key]))/1000)}s prima di riprovare.`);
    }
    global.cooldowns[key] = now;

    let localita = [];
    try {
      localita = JSON.parse(fs.readFileSync('./localita_dataset(1).json'));
    } catch (e) {
      return m.reply('⚠️ Errore durante il caricamento delle località.');
    }

    const scelta = localita[Math.floor(Math.random() * localita.length)];
    const intro = '🌍 *Indovina la città da questa immagine!*';

    global.geoGame = global.geoGame || {};
    global.geoGame[m.chat] = {
      risposta: scelta.città.toLowerCase(),
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.geoGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! Risposta: *${scelta.città}*`, m);
          delete global.geoGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(m.chat, { image: { url: scelta.url }, caption: `${intro}\n⌛ Hai 60 secondi.` }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const game = global.geoGame?.[m.chat];
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
┃ 🗺️ *Città:* ${game.risposta}
┃ ⏱️ *Tempo impiegato:* ${timeTaken}s
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 💰 euro
┃ • ${exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯

> \`by chatunity\``;

    await conn.reply(m.chat, congratsMessage, m);
    delete global.geoGame[m.chat];
  }
};

handler.help = ['indovinalocalità','skipmap'];
handler.tags = ['game'];
handler.command = ['indovinalocalità','skipmap'];
export default handler;
