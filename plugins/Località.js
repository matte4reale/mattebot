let geoGame = {};
let cooldowns = {};

const localita_dataset = [
  {
    city: "Parigi",
    image: "https://raw.githubusercontent.com/OpenAIExamples/geoguess-images/main/paris.jpg",
    options: ["parigi", "londra", "roma", "berlino", "madrid"]
  },
  {
    city: "Roma",
    image: "https://raw.githubusercontent.com/OpenAIExamples/geoguess-images/main/rome.jpg",
    options: ["madrid", "roma", "parigi", "berlino", "londra"]
  },
  {
    city: "Londra",
    image: "https://raw.githubusercontent.com/OpenAIExamples/geoguess-images/main/london.jpg",
    options: ["parigi", "londra", "new york", "berlino", "tokyo"]
  },
  {
    city: "New York",
    image: "https://raw.githubusercontent.com/OpenAIExamples/geoguess-images/main/newyork.jpg",
    options: ["new york", "los angeles", "chicago", "miami", "houston"]
  },
  {
    city: "Tokyo",
    image: "https://raw.githubusercontent.com/OpenAIExamples/geoguess-images/main/tokyo.jpg",
    options: ["tokyo", "seoul", "beijing", "shanghai", "bangkok"]
  },
  {
    city: "Sydney",
    image: "https://raw.githubusercontent.com/OpenAIExamples/geoguess-images/main/sydney.jpg",
    options: ["sydney", "melbourne", "brisbane", "perth", "adelaide"]
  }
];

async function sendQuestion(m, conn) {
  if (geoGame[m.chat]) return conn.reply(m.chat, '⚠️ Partita già in corso!');

  const now = Date.now();
  if (cooldowns[m.chat] && now - cooldowns[m.chat] < 15000) {
    return conn.reply(m.chat, `⏳ Attendi ancora ${Math.ceil((15000 - (now - cooldowns[m.chat]))/1000)} secondi.`);
  }
  cooldowns[m.chat] = now;

  const scelta = localita_dataset[Math.floor(Math.random() * localita_dataset.length)];

  // Mischia opzioni
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
    buttonText: { displayText: opt.charAt(0).toUpperCase() + opt.slice(1) },
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
      return; // ignora altri comandi
    } else {
      await conn.reply(m.chat, '❌ Risposta sbagliata, riprova!', m);
    }
  }
};

handler.help = ['mappa', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'skipmap'];

export default handler;