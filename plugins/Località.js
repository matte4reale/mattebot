// Dataset locale dentro il plugin (esempio con 6 città, estendi pure)
const localita_dataset = [
  {
    city: "Parigi",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/640px-Paris_Night.jpg",
    options: ["parigi", "londra", "roma", "berlino", "madrid"]
  },
  {
    city: "Roma",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/640px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    options: ["madrid", "roma", "parigi", "berlino", "londra"]
  },
  {
    city: "New York",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Manhattan_Midtown_Skyline_2017.jpg/640px-Manhattan_Midtown_Skyline_2017.jpg",
    options: ["los angeles", "new york", "chicago", "toronto", "boston"]
  },
  {
    city: "Tokyo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Tokyo_Tower_and_Skytree.jpg/640px-Tokyo_Tower_and_Skytree.jpg",
    options: ["tokyo", "seoul", "shanghai", "bangkok", "taipei"]
  },
  {
    city: "Sydney",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Sydney_Opera_House_-_Dec_2008.jpg/640px-Sydney_Opera_House_-_Dec_2008.jpg",
    options: ["melbourne", "sydney", "brisbane", "perth", "auckland"]
  },
  {
    city: "Londra",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/London_Eye_Twilight_April_2006.jpg/640px-London_Eye_Twilight_April_2006.jpg",
    options: ["londra", "parigi", "amsterdam", "bruxelles", "dublino"]
  }
];

let geoGame = {};
let cooldowns = {};

async function sendQuestion(m, conn) {
  if (geoGame[m.chat]) return conn.reply(m.chat, '⚠️ Partita già in corso!');

  const now = Date.now();
  if (cooldowns[m.chat] && now - cooldowns[m.chat] < 15000) {
    return conn.reply(m.chat, `⏳ Attendi ancora ${Math.ceil((15000 - (now - cooldowns[m.chat]))/1000)} secondi.`);
  }
  cooldowns[m.chat] = now;

  // Scegli una città casuale
  const scelta = localita_dataset[Math.floor(Math.random() * localita_dataset.length)];

  // Mescola le opzioni
  const optionsShuffled = scelta.options
    .map(opt => ({ opt, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.opt);

  geoGame[m.chat] = {
    risposta: scelta.city.toLowerCase(),
    timeout: setTimeout(() => {
      if (geoGame[m.chat]) {
        conn.reply(m.chat, `⏰ Tempo scaduto! La risposta era: *${scelta.city}*`, m);
        delete geoGame[m.chat];
      }
    }, 60000)
  };

  let buttons = optionsShuffled.map(opt => ({
    buttonId: `.${opt}`,
    buttonText: { displayText: opt },
    type: 1
  }));

  await conn.sendMessage(m.chat, {
    image: { url: scelta.image },
    caption: `🌍 *Indovina la città!* Hai 60 secondi.\nClicca il bottone corrispondente.`,
    buttons,
    headerType: 4
  }, { quoted: m });
}

let handler = async (m, { conn }) => {
  const text = m.text?.toLowerCase();

  if (text === '.skipmap') {
    if (!geoGame[m.chat]) return conn.reply(m.chat, '⚠️ Nessuna partita in corso.', m);
    clearTimeout(geoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Partita interrotta! La risposta era: *${geoGame[m.chat].risposta}*`, m);
    delete geoGame[m.chat];
    return;
  }

  if (text === '.mappa') {
    return sendQuestion(m, conn);
  }

  if (geoGame[m.chat]) {
    if (text === geoGame[m.chat].risposta) {
      clearTimeout(geoGame[m.chat].timeout);
      await conn.reply(m.chat, `🎉 Risposta corretta! Era *${geoGame[m.chat].risposta}*`, m);
      delete geoGame[m.chat];
    } else if (text?.startsWith('.')) {
      // Ignora altri comandi
      return;
    } else {
      await conn.reply(m.chat, '❌ Risposta sbagliata, riprova!', m);
    }
  }
};

handler.help = ['mappa', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'skipmap'];

export default handler;