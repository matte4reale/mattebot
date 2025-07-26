let handler = m => m;

const matteID = '66621409462@s.whatsapp.net';
const edyID = '40767396892@s.whatsapp.net';
let tedAttivo = true;

const frasiTed = [
  "Sto qua brutto coglione, che vuoi?",
  "Oh fratè, ancora tu? Ma non eri morto?",
  "Mi hai rotto i coglioni come le pubblicità su YouTube.",
  "Parla veloce che ho una birra che si sta scaldando.",
  "Minchia se parli ancora svengo.",
  "Che vuoi? Sto pisciando e mi chiami?",
  "Non mi rompere che sto guardando porno.",
  "Pure oggi a scassare? Siete instancabili.",
  "Sembri mia zia quando mi chiama a Natale.",
];

const insultiEdy = [
  "Edy sei la causa del riscaldamento globale.",
  "Cambia faccia Edy, fa crashare i server.",
  "Edy hai meno carisma di un cartone del latte.",
  "La tua voce Edy è come uno screamer muto.",
  "Ogni volta che parli Edy, un neurone muore.",
  "Edy esisti ancora? Che delusione.",
  "Tu Edy sei l'aggiornamento che nessuno voleva.",
];

const risposteMatte = [
  "Ti voglio bene fratello.",
  "Tu sei Jonny e io sono Ted, fine.",
  "Solo tu puoi sopportarmi fratellì.",
  "Fratè giuro che sei l'unico vero.",
  "Mi manchi anche se ci stai parlando ora.",
  "Sei il mio socio, il mio orso, il mio tutto.",
];

async function usaChatGPT(prompt) {
  try {
    const response = await fetch('https://chatgpt.apine.dev/api/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
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

  if (isMatte) {
    if (m.quoted && m.quoted.fromMe) {
      let frase = risposteMatte[Math.floor(Math.random() * risposteMatte.length)];
      return conn.reply(m.chat, frase, m);
    }
    return;
  }

  if (mentionsMatte) {
    let frase = frasiTed[Math.floor(Math.random() * frasiTed.length)];
    return conn.reply(m.chat, frase, m);
  }

  if (mentionsEdy) {
    let frase = insultiEdy[Math.floor(Math.random() * insultiEdy.length)];
    return conn.reply(m.chat, frase, m);
  }

  if (m.quoted && m.quoted.fromMe) {
    let risposta = await usaChatGPT(m.text);
    if (risposta) {
      return conn.reply(m.chat, risposta, m);
    }
  }

  return;
};

export default handler;