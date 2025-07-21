import fs from 'fs';
import path from 'path';

const localitaDataset = [
  { city: "Parigi", country: "Francia", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=640&q=80" },
  { city: "Roma", country: "Italia", url: "https://images.unsplash.com/photo-1549899619-8a235b3443ee?auto=format&fit=crop&w=640&q=80" },
  { city: "New York", country: "USA", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=640&q=80" },
  { city: "Londra", country: "Regno Unito", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80" },
  { city: "Tokyo", country: "Giappone", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=640&q=80" }
  // aggiungi altre località qui con foto da Unsplash o altra fonte simile
];

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

    global.cooldowns = global.cooldowns || {};
    const now = Date.now(), key = `geo_${m.chat}`;
    if (now - (global.cooldowns[key] || 0) < 15000) {
      return m.reply(`⏳ Attendi ${Math.ceil((15000 - (now - global.cooldowns[key]))/1000)}s prima di riprovare.`);
    }
    global.cooldowns[key] = now;

    const scelta = localitaDataset[Math.floor(Math.random() * localitaDataset.length)];

    currentGame[m.chat] = {
      risposta: scelta.city.toLowerCase(),
      timeout: setTimeout(() => {
        if (currentGame[m.chat]) {
          conn.sendMessage(m.chat, { text: `⏰ Tempo scaduto! La risposta corretta era: *${scelta.city}*` }, { quoted: m });
          delete currentGame[m.chat];
        }
      }, 60000),
      startTime: Date.now()
    };

    // Percorso locale della mappa (assicurati che sia nella cartella plugins o dove vuoi)
    const mapFilePath = path.resolve('./plugins/mappa.png');

    // Invia prima la mappa locale
    await conn.sendMessage(m.chat, { image: fs.readFileSync(mapFilePath) }, { quoted: m });

    // Dopo 1.5 secondi invia la foto della città da URL
    setTimeout(async () => {
      await conn.sendMessage(m.chat, { image: { url: scelta.url }, caption: 'Indovina la città da questa immagine!' }, { quoted: m });
    }, 1500);
  }
};

handler.before = async (m, { conn }) => {
  if (!currentGame[m.chat] || m.key.fromMe) return;
  const text = m.text?.toLowerCase().trim();
  if (!text) return;

  const game = currentGame[m.chat];
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

handler.help = ['mappa', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'skipmap'];
export default handler;