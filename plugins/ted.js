let handler = m => m;

const matteID = '66621409462@s.whatsapp.net';
const edyID = '40767396892@s.whatsapp.net';
let tedAttivo = true;

const frasiTed = [
  "Oh cazzo fratello, sei serio?",
  "Tua madre viene con te, anaffettivo!",
  "Zitto palla di pelo? Non sono mica il tuo peluche!",
  "Edy, ogni volta che parli muore un neurone.",
  "Matte è il mio fratello, attento a come parli!",
  "Chi ha svegliato il genio? Ah no, sei solo tu.",
  "Fratè, sembri uscito da un tutorial su come non vivere.",
  "Sei più inutile di una matita senza mina.",
  "Edy, la tua esistenza è un errore 404.",
  "Non toccare Matte, è come un fratello per me.",
  "Occhio a quello che dici su Matte, coglione."
];

async function usaChatGPT(prompt, tonoAmichevole = false) {
  try {
    const istruzioni = tonoAmichevole
      ? 'Rispondi come se fossi Ted nel film, parlando con il suo migliore amico John. Sii sarcastico ma affettuoso e divertente.'
      : 'Rispondi come se fossi Ted nel film, in modo provocatorio, volgare e arrogante. Insulta pure se serve.';

    const response = await fetch('https://chatgpt.apine.dev/api/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `${istruzioni}\n${prompt}` })
    });
    const data = await response.json();
    return data.message;
  } catch {
    return null;
  }
}

handler.all = async function (m, { conn }) {
  if (!m.text) return;

  const text = m.text.toLowerCase();

  if (text.includes('ted calma')) {
    tedAttivo = false;
    return conn.reply(m.chat, 'Ok fratè, sto muto.', m);
  }

  if (text.includes('ted fatti sentire')) {
    tedAttivo = true;
    return conn.reply(m.chat, 'Sto qua brutto coglione, che vuoi?', m);
  }

  if (!tedAttivo) return;

  const sender = m.sender;
  const isMatte = sender === matteID;
  const mentions = m.mentionedJid || [];
  const mentionsMatte = mentions.includes(matteID) || text.includes('matte');
  const mentionsEdy = mentions.includes(edyID) || text.includes('edy');

  if (mentionsMatte && !isMatte) {
    let difese = frasiTed.filter(f => f.toLowerCase().includes('matte'));
    if (difese.length > 0) {
      let frase = difese[Math.floor(Math.random() * difese.length)];
      return conn.reply(m.chat, frase, m);
    }
  }

  if (mentionsEdy) {
    let insulti = frasiTed.filter(f => f.toLowerCase().includes('edy'));
    if (insulti.length > 0) {
      let frase = insulti[Math.floor(Math.random() * insulti.length)];
      return conn.reply(m.chat, frase, m);
    }
  }

  if (m.quoted && m.quoted.fromMe) {
    let tonoAmichevole = sender === matteID;
    let risposta = await usaChatGPT(m.text, tonoAmichevole);
    if (risposta) {
      return conn.reply(m.chat, risposta, m);
    }
  }

  return;
};

handler.customPrefix = /./;
handler.command = new RegExp;
handler.disabled = false;

export default handler;