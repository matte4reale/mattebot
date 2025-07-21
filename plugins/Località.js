import fs from 'fs';
import path from 'path';
import localita_dataset from './localita_dataset(1).json' assert { type: 'json' };

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

  if (text === '.mappa') {
    if (global.geoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!');
    global.cooldowns = global.cooldowns || {};
    const now = Date.now(), key = `geo_${m.chat}`;
    if (now - (global.cooldowns[key] || 0) < 15000) {
      return m.reply(`⏳ Attendi ${Math.ceil((15000 - (now - global.cooldowns[key]))/1000)}s prima di riprovare.`);
    }
    global.cooldowns[key] = now;

    const scelta = localita_dataset[Math.floor(Math.random() * localita_dataset.length)];
    const rispostaCorretta = scelta.city.toLowerCase();

    global.geoGame = global.geoGame || {};
    global.geoGame[m.chat] = {
      risposta: rispostaCorretta,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.geoGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! Risposta: *${scelta.city}*`, m);
          delete global.geoGame[m.chat];
        }
      }, 60000)
    };

    const mappaPath = path.resolve('./plugins/mappa.png'); // ← percorso locale dell’immagine

    // Invia immagine mappa
    if (fs.existsSync(mappaPath)) {
      await conn.sendMessage(m.chat, { image: fs.readFileSync(mappaPath), caption: '🗺️ Mappa vuota, ora indovina la città!' }, { quoted: m });
    } else {
      await conn.reply(m.chat, '⚠️ Errore: immagine della mappa non trovata!', m);
    }

    // Invia immagine città da indovinare
    await conn.sendMessage(m.chat, { image: { url: scelta.url }, caption: '🔍 Indovina questa città! Hai 60 secondi.' }, { quoted: m });
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

> \`vare ✧ bot\``;

    await conn.reply(m.chat, congratsMessage, m);
    delete global.geoGame[m.chat];
  }
};

handler.help = ['mappa','skipmap'];
handler.tags = ['game'];
handler.command = ['mappa','skipmap'];
export default handler;
