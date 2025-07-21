import fs from 'fs';
import path from 'path';

let localitaDataset = [];

// Carica il dataset una volta sola all'avvio
try {
  const dataPath = path.resolve('./plugins/localita_dataset.json'); // cambia il path se serve
  const rawData = fs.readFileSync(dataPath);
  localitaDataset = JSON.parse(rawData);
} catch (e) {
  console.error('Errore caricamento localita_dataset.json:', e);
}

let currentGame = {};

const handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skipmap') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
    if (!currentGame[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono interrompere!');
    clearTimeout(currentGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${currentGame[m.chat].risposta}*`, m);
    delete currentGame[m.chat];
    return;
  }

  if (text === '.mappa') {
    if (currentGame[m.chat]) return m.reply('⚠️ Partita già in corso!');
    if (localitaDataset.length === 0) return m.reply('⚠️ Dataset non disponibile.');

    global.cooldowns = global.cooldowns || {};
    const now = Date.now(), key = `geo_${m.chat}`;
    if (now - (global.cooldowns[key] || 0) < 15000) {
      return m.reply(`⏳ Attendi ${Math.ceil((15000 - (now - global.cooldowns[key]))/1000)}s prima di riprovare.`);
    }
    global.cooldowns[key] = now;

    // Scegli una località a caso dal dataset
    const scelta = localitaDataset[Math.floor(Math.random() * localitaDataset.length)];

    // Imposta il gioco
    currentGame[m.chat] = {
      risposta: scelta.city.toLowerCase(),
      timeout: setTimeout(() => {
        if (currentGame[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! Risposta: *${scelta.city}*`, m);
          delete currentGame[m.chat];
        }
      }, 60000),
      startTime: Date.now()
    };

    // Invia immagine della mappa (puoi sostituire il link con un file locale con conn.sendMessage e {image: fs.readFileSync(path)})
    const mapImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/BlankMap-World.svg/1200px-BlankMap-World.svg.png';

    await conn.sendMessage(m.chat, {
      image: { url: mapImageUrl },
      caption: `🌍 *Indovina la città dalla foto che ti invierò dopo!*\n\nRispondi scrivendo il nome della città entro 60 secondi!`
    }, { quoted: m });

    // Dopo un secondo circa, manda l'immagine della città (puoi anche mandare direttamente nel messaggio sopra se vuoi)
    setTimeout(() => {
      conn.sendMessage(m.chat, {
        image: { url: scelta.url },
        caption: `📸 Ecco la foto della città! Indovina!`
      }, { quoted: m });
    }, 1500);

  }
};

handler.before = async (m, { conn }) => {
  const game = currentGame[m.chat];
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
    delete currentGame[m.chat];
  }
};

handler.help = ['mappa','skipmap'];
handler.tags = ['game'];
handler.command = ['mappa','skipmap'];

export default handler;