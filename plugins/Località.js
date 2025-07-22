import path from 'path';

let localita_dataset = [
  {
    url: 'https://raw.githubusercontent.com/cs-sfu/GeoDataset/main/images/toronto.jpg',
    nome: 'Toronto'
  },
  {
    url: 'https://raw.githubusercontent.com/cs-sfu/GeoDataset/main/images/niagara_falls.jpg',
    nome: 'Cascate del Niagara'
  },
  {
    url: 'https://raw.githubusercontent.com/cs-sfu/GeoDataset/main/images/grand_canyon.jpg',
    nome: 'Grand Canyon'
  },
  {
    url: 'https://raw.githubusercontent.com/cs-sfu/GeoDataset/main/images/yosemite.jpg',
    nome: 'Yosemite'
  },
  {
    url: 'https://raw.githubusercontent.com/cs-sfu/GeoDataset/main/images/banff.jpg',
    nome: 'Banff'
  },
  // aggiungi altre fino a 20
];

let handler = async (m, { conn }) => {
  if (m.text.toLowerCase() === '.mappa') {
    if (global.geoGame && global.geoGame[m.chat]) {
      return conn.reply(m.chat, '⚠️ Gioco già in corso, usa .skipmap per saltare.', m);
    }

    // Scegli una località a caso
    let scelta = localita_dataset[Math.floor(Math.random() * localita_dataset.length)];

    // Prepara le opzioni: 4 risposte casuali + quella giusta
    let opzioni = [scelta.nome];
    while (opzioni.length < 5) {
      let randomLoc = localita_dataset[Math.floor(Math.random() * localita_dataset.length)].nome;
      if (!opzioni.includes(randomLoc)) opzioni.push(randomLoc);
    }
    // Mischia le opzioni
    opzioni = opzioni.sort(() => Math.random() - 0.5);

    // Salva il gioco globale
    global.geoGame = global.geoGame || {};
    global.geoGame[m.chat] = {
      risposta: scelta.nome,
      timeout: setTimeout(() => {
        conn.reply(m.chat, `⏰ Tempo scaduto! La risposta era: *${scelta.nome}*`, m);
        delete global.geoGame[m.chat];
      }, 60000),
    };

    // Manda la mappa dalla cartella plugin (adatta il percorso se serve)
    await conn.sendMessage(
      m.chat,
      { image: { url: path.resolve('./plugins/mappa.png') }, caption: '🌍 *Indovina il luogo dalla foto!*' },
      { quoted: m }
    );

    // Manda la foto del luogo con 5 bottoni
    let buttons = opzioni.map(opt => ({ buttonId: opt, buttonText: { displayText: opt }, type: 1 }));
    await conn.sendMessage(
      m.chat,
      {
        image: { url: scelta.url },
        caption: 'Qual è questo luogo?',
        buttons,
        headerType: 1,
      },
      { quoted: m }
    );
  }
};

handler.before = async (m, { conn }) => {
  const game = global.geoGame?.[m.chat];
  if (!game || m.key.fromMe) return;
  if (!m.message?.buttonsResponseMessage) return; // solo risposte ai bottoni

  let risposta = m.message.buttonsResponseMessage.selectedButtonId;
  if (!risposta) return;

  if (risposta.toLowerCase() === game.risposta.toLowerCase()) {
    clearTimeout(game.timeout);
    await conn.reply(m.chat, `🎉 Complimenti! Hai indovinato: *${game.risposta}*`, m);
    delete global.geoGame[m.chat];
  } else {
    await conn.reply(m.chat, '❌ Sbagliato, riprova!', m);
  }
};

handler.help = ['mappa', 'skipmap'];
handler.tags = ['game'];
handler.command = ['mappa', 'skipmap'];

export default handler;