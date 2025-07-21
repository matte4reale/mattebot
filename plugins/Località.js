let localitaDataset = [
  { city: "Paris", country: "France", url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/eiffel-tower-736529_1280.jpg" },
  { city: "Rome", country: "Italy", url: "https://cdn.pixabay.com/photo/2016/11/29/03/55/colosseum-1868867_1280.jpg" },
  { city: "New York", country: "USA", url: "https://cdn.pixabay.com/photo/2016/03/27/19/34/new-york-1284917_1280.jpg" },
  { city: "London", country: "UK", url: "https://cdn.pixabay.com/photo/2015/06/08/15/11/london-802605_1280.jpg" },
  { city: "Sydney", country: "Australia", url: "https://cdn.pixabay.com/photo/2016/11/29/09/08/sydney-opera-house-1868454_1280.jpg" },
  { city: "Tokyo", country: "Japan", url: "https://cdn.pixabay.com/photo/2016/10/02/22/17/tokyo-1712459_1280.jpg" },
  { city: "Berlin", country: "Germany", url: "https://cdn.pixabay.com/photo/2017/02/15/10/56/berlin-2064114_1280.jpg" },
  { city: "Moscow", country: "Russia", url: "https://cdn.pixabay.com/photo/2017/06/05/22/03/moscow-2378771_1280.jpg" },
  { city: "Dubai", country: "UAE", url: "https://cdn.pixabay.com/photo/2016/01/19/17/45/dubai-1149376_1280.jpg" },
  { city: "Rio de Janeiro", country: "Brazil", url: "https://cdn.pixabay.com/photo/2016/11/06/05/14/rio-de-janeiro-1807533_1280.jpg" }
  // Aggiungi altre località se vuoi...
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
          conn.reply(m.chat, `⏰ Tempo scaduto! La risposta corretta era: *${scelta.city}*`, m);
          delete currentGame[m.chat];
        }
      }, 60000),
      startTime: Date.now()
    };

    const mapImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/BlankMap-World.svg/1200px-BlankMap-World.svg.png';

    await conn.sendMessage(m.chat, {
      image: { url: mapImageUrl },
      caption: `🌍 *Indovina la città dalla foto che ti invierò dopo!*\n\nRispondi scrivendo il nome della città entro 60 secondi!`
    }, { quoted: m });

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

handler.help = ['mappa', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'skipmap'];

export default handler;