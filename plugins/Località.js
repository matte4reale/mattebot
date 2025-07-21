const localitaDataset = [
  { city: "Parigi", country: "Francia", url: "https://cdn.pixabay.com/photo/2015/03/26/09/41/eiffel-tower-690293_960_720.jpg" },
  { city: "Roma", country: "Italia", url: "https://cdn.pixabay.com/photo/2016/11/29/03/53/colosseum-1868054_960_720.jpg" },
  { city: "New York", country: "USA", url: "https://cdn.pixabay.com/photo/2016/11/18/18/06/new-york-1839175_960_720.jpg" },
  { city: "Londra", country: "Regno Unito", url: "https://cdn.pixabay.com/photo/2017/09/12/11/22/london-2747702_960_720.jpg" },
  { city: "Tokyo", country: "Giappone", url: "https://cdn.pixabay.com/photo/2018/05/28/16/09/tokyo-3434285_960_720.jpg" }
  // ... aggiungi tutte le città che vuoi
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

    // Link mappa (puoi personalizzare)
    const mapImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/BlankMap-World.svg/1200px-BlankMap-World.svg.png';

    await conn.sendMessage(m.chat, { text: `🌍 Ecco la mappa:\n${mapImageUrl}` }, { quoted: m });

    setTimeout(async () => {
      await conn.sendMessage(m.chat, { text: `📸 Foto città:\n${scelta.url}` }, { quoted: m });
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

handler.help = ['mappa','skipmap'];
handler.tags = ['game'];
handler.command = ['mappa','skipmap'];
export default handler;