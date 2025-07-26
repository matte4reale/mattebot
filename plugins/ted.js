let handler = m => m;
import fetch from 'node-fetch';

const matte = '66621409462@s.whatsapp.net';
const edy = '40767396892@s.whatsapp.net';

let silenzioso = false;

const frasiMatte = [
  "Fratè ma ti rendi conto che sei il mio Jonny?",
  "Oh Matte, se non ci fossi te sarei ancora in quel cesso di scaffale da Walmart.",
  "Ti voglio bene brutto coglione, non ti dimenticare.",
  "Fratè oggi andiamo a farci una birra e insultiamo la gente insieme, come ai vecchi tempi.",
  "Matte, senza di te la mia vita sarebbe un film brutto su Netflix.",
  "Oh fratello, sei l’unico per cui prenderei a calci chiunque, pure Dio."
];

const frasiEdy = [
  "Oh Edy ma vai a fanculo te e le tue sopracciglia.",
  "Sei talmente inutile che anche Alexa ti ignorerebbe.",
  "Hai la stessa simpatia di un parcheggio pieno.",
  "Edy sei come un martello in un microonde: fuori posto.",
  "Parli come se avessi fatto il corso base di 'Essere fastidiosi'.",
  "Oh Edy, se l’intelligenza fosse un crimine, saresti ancora libero."
];

const frasiGeneriche = [
  "E allora? Ti hanno tirato fuori dal bidone stamattina?",
  "Fratè, parli ma nessuno ha chiesto.",
  "Dovevi stare zitto, e invece hai scritto.",
  "Sto qua brutto coglione, che vuoi?",
  "Ti svegli ogni giorno e scegli la vergogna.",
  "Ma se ti metti in silenzioso da solo fai un favore a tutti."
];

handler.all = async function (m, { conn, text }) {
  if (!m.isGroup || m.fromMe || m.sender === conn.user.jid) return;

  const lower = text.toLowerCase();

  // Comandi vocali
  if (lower.includes('ted calma')) {
    silenzioso = true;
    return conn.reply(m.chat, 'Ok fratè, mi sto zitto... per ora.', m);
  }

  if (lower.includes('ted fatti sentire')) {
    silenzioso = false;
    return conn.reply(m.chat, 'Eccomi brutto coglione, chi devo insultare?', m);
  }

  if (silenzioso) return;

  const mentioned = m.mentionedJid || [];
  const taggaMatte = mentioned.includes(matte);
  const taggaEdy = mentioned.includes(edy);

  if (taggaMatte) {
    const frase = frasiMatte[Math.floor(Math.random() * frasiMatte.length)];
    return conn.reply(m.chat, frase, m, { quoted: m });
  }

  if (taggaEdy) {
    const frase = frasiEdy[Math.floor(Math.random() * frasiEdy.length)];
    return conn.reply(m.chat, frase, m, { quoted: m });
  }

  if (mentioned.length) {
    const frase = frasiGeneriche[Math.floor(Math.random() * frasiGeneriche.length)];
    return conn.reply(m.chat, frase, m, { quoted: m });
  }

  // Se Matte scrive senza tag, rispondigli in modo "fraterno"
  if (m.sender === matte && !m.quoted && !mentioned.length) {
    const frase = frasiMatte[Math.floor(Math.random() * frasiMatte.length)];
    return conn.reply(m.chat, frase, m);
  }

  // Fallback con API
  if (mentioned.length && !taggaMatte) {
    try {
      const risposta = await fetch('https://api.rozemy.me/chatgpt?message=' + encodeURIComponent(text));
      const data = await risposta.json();
      if (data.status) {
        const reply = data.response;
        return conn.reply(m.chat, reply, m, { quoted: m });
      }
    } catch (e) {
      console.error(e);
    }
  }
};

// Aggiunti per compatibilità e ordinamento
handler.command = /^ted$/i;
handler.help = ['ted'];
handler.tags = ['fun'];

export default handler;