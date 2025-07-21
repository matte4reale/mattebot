import fs from 'fs/promises';

let localita = [];

async function caricaLocalita() {
  try {
    const data = await fs.readFile('./lib/localita.dataset(1)json', 'utf-8');
    localita = JSON.parse(data);
  } catch (e) {
    console.error('Errore caricando localita.json:', e);
  }
}

// Carica le località appena parte il modulo
caricaLocalita();

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
    const now = Date.now();
    const key = `geo_${m.chat}`;

    if (now - (global.cooldowns[key] || 0) < 15000) {
      const wait = Math.ceil((15000 - (now - global.cooldowns[key])) / 1000);
      return m.reply(`⏳ Attendi ${wait}s prima di riprovare.`);
    }
    global.cooldowns[key] = now;

    if (!localita.length) {
      return m.reply('⚠️ Errore: lista località non caricata.');
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

    await conn.sendMessage(m.chat, {
      image: { url: scelta.url },
      caption: `${intro}\n⌛ Hai 60 secondi.`
    }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const game = global.geoGame?.[m.chat];
  if (!game || m.key.fromMe) return;

  const rispostaUtente = m.text?.toLowerCase().trim();
  if (!rispostaUtente) return;

  if (rispostaUtente === game.risposta) {
    clearTimeout(game.timeout);

    const timeTaken = ((Date.now() - game.startTime) / 1000).toFixed(1);
    const reward = Math.floor(Math.random() * 100 + 100);
    const exp = Math.floor(Math.random() * 10 + 10);

    const congratsMessage = `
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

> \`vare ✧ bot\``;

    await conn.reply(m.chat, congratsMessage, m);
    delete global.geoGame[m.chat];
  }
};

handler.help = ['indovinalocalità', 'skipmap'];
handler.tags = ['game'];
handler.command = ['indovinalocalità', 'skipmap'];

export default handler;
