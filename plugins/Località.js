import axios from 'axios';

let geoGame = {};

let cooldowns = {};

let datasetURL = 'https://raw.githubusercontent.com/username/city-images-dataset/main/cities.json'; // Metti il link reale

const getRandomInt = (max) => Math.floor(Math.random() * max);

const sendQuestion = async (m, conn) => {
  if (geoGame[m.chat]) return conn.reply(m.chat, '⚠️ Partita già in corso!');
  
  const now = Date.now();
  if (cooldowns[m.chat] && now - cooldowns[m.chat] < 15000) {
    return conn.reply(m.chat, `⏳ Attendi ancora ${Math.ceil((15000 - (now - cooldowns[m.chat]))/1000)} secondi prima di riprovare.`);
  }
  cooldowns[m.chat] = now;

  try {
    const res = await axios.get(datasetURL);
    const cities = res.data;

    const scelta = cities[getRandomInt(cities.length)];

    const optionsShuffled = scelta.options
      .map(opt => ({ opt, sort: Math.random() }))
      .sort((a,b) => a.sort - b.sort)
      .map(a => a.opt);

    geoGame[m.chat] = {
      risposta: scelta.city,
      timeout: setTimeout(() => {
        if (geoGame[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! La risposta era: *${scelta.city}*`, m);
          delete geoGame[m.chat];
        }
      }, 60000)
    };

    let buttons = optionsShuffled.map((opt, i) => ({
      buttonId: `.${opt}`,
      buttonText: { displayText: opt },
      type: 1
    }));

    await conn.sendMessage(m.chat, {
      image: { url: scelta.image },
      caption: `🌍 *Indovina la città!* Hai 60 secondi.\nRispondi cliccando un bottone.`,
      buttons,
      headerType: 4
    }, { quoted: m });

  } catch(e) {
    conn.reply(m.chat, '⚠️ Errore nel caricamento del gioco, riprova più tardi.', m);
    console.error(e);
  }
};

let handler = async (m, { conn, text }) => {
  if (text === '.skipmap') {
    if (!geoGame[m.chat]) return conn.reply(m.chat, '⚠️ Nessuna partita in corso.');
    clearTimeout(geoGame[m.chat].timeout);
    conn.reply(m.chat, `🛑 Partita interrotta! La risposta era: *${geoGame[m.chat].risposta}*`, m);
    delete geoGame[m.chat];
    return;
  }
  if (text === '.mappa') {
    return sendQuestion(m, conn);
  }

  // Risposta tramite bottone o testo
  if (geoGame[m.chat]) {
    if (text?.toLowerCase() === geoGame[m.chat].risposta.toLowerCase()) {
      clearTimeout(geoGame[m.chat].timeout);

      // Calcolo punteggio e tempo (semplice)
      const reward = Math.floor(Math.random() * 100 + 100);
      const exp = Math.floor(Math.random() * 10 + 10);

      let congratsMessage = `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🗺️ *Città:* ${geoGame[m.chat].risposta}
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 💰 euro
┃ • ${exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯
      `;

      await conn.reply(m.chat, congratsMessage, m);
      delete geoGame[m.chat];
    } else {
      // Risposta sbagliata - opzionale: puoi rispondere o no
      await conn.reply(m.chat, '❌ Risposta sbagliata, riprova!', m);
    }
  }
};

handler.help = ['mappa', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'skipmap'];

export default handler;