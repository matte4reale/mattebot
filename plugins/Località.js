import fs from 'fs';
import path from 'path';

const localita_dataset = [
  { city: 'Roma', country: 'Italia', url: 'https://images.mapillary.com/7c42d1e5c0e99e39d62fa0d05b1c6e35.jpg' },
  { city: 'Parigi', country: 'Francia', url: 'https://images.mapillary.com/1e2ac65e12e4d6a97d04a81efb6f4b2e.jpg' },
  { city: 'New York', country: 'USA', url: 'https://images.mapillary.com/4e89c1d04d2768b8a7f7c02af92f9de0.jpg' },
  { city: 'Londra', country: 'Regno Unito', url: 'https://images.mapillary.com/5af02ef0a138334fc2c0b92b44ea012b.jpg' },
  { city: 'Tokyo', country: 'Giappone', url: 'https://images.mapillary.com/71a5c8a45acba37d8a1a78e342cb53b9.jpg' },
];

let geoGame = {};

const handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skipmap') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
    if (!geoGame[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono interrompere!');
    clearTimeout(geoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${geoGame[m.chat].risposta}*`, m);
    delete geoGame[m.chat];
    return;
  }

  if (text === '.mappa' || text === '.indovinalocalità') {
    if (geoGame[m.chat]) return m.reply('⚠️ Partita già in corso!');
    geoGame[m.chat] = {};

    // Scegli località casuale
    const scelta = localita_dataset[Math.floor(Math.random() * localita_dataset.length)];
    
    geoGame[m.chat].risposta = scelta.city.toLowerCase();
    geoGame[m.chat].startTime = Date.now();

    // Timeout partita 60 secondi
    geoGame[m.chat].timeout = setTimeout(() => {
      if (geoGame[m.chat]) {
        conn.reply(m.chat, `⏰ Tempo scaduto! La risposta corretta era: *${scelta.city}*`, m);
        delete geoGame[m.chat];
      }
    }, 60000);

    // Carica immagine mappa locale (assumi plugins/mappa.png)
    const imgPath = path.resolve('./plugins/mappa.png');
    const imgBuffer = fs.existsSync(imgPath) ? fs.readFileSync(imgPath) : null;

    // Prepara bottoni con 5 opzioni (1 giusta + 4 casuali)
    let choices = [scelta.city];
    while (choices.length < 5) {
      const randomCity = localita_dataset[Math.floor(Math.random() * localita_dataset.length)].city;
      if (!choices.includes(randomCity)) choices.push(randomCity);
    }
    // Mescola scelte
    choices = choices.sort(() => Math.random() - 0.5);

    const buttons = choices.map(c => ({ buttonId: c.toLowerCase(), buttonText: { displayText: c }, type: 1 }));

    // Manda mappa e immagine città con bottoni
    await conn.sendMessage(m.chat, { 
      image: imgBuffer ? { buffer: imgBuffer } : { url: 'https://i.imgur.com/4z6pN6F.png' }, // fallback se manca file
      caption: `🌍 *Indovina la città da questa immagine sotto!*`,
      footer: 'Scegli la città corretta dai bottoni',
      buttons: buttons,
      headerType: 4
    }, { quoted: m });

    await conn.sendMessage(m.chat, { image: { url: scelta.url }, caption: '🖼️ Ecco l\'immagine della città da indovinare!' }, { quoted: m });
  }
};

// Rileva risposta
handler.before = async (m, { conn }) => {
  if (!geoGame[m.chat]) return;
  if (!m.text) return;
  const risposta = geoGame[m.chat].risposta;
  if (m.text.toLowerCase() === risposta) {
    clearTimeout(geoGame[m.chat].timeout);
    const timeTaken = ((Date.now() - geoGame[m.chat].startTime) / 1000).toFixed(1);
    await conn.reply(m.chat,
      `🎉 *RISPOSTA CORRETTA!*\nLa città è: *${risposta}*\nHai risposto in: ${timeTaken}s! 🎊`
    );
    delete geoGame[m.chat];
  }
};

handler.help = ['mappa', 'indovinalocalità', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'indovinalocalità', 'skipmap'];

export default handler;