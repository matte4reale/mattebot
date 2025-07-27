import fetch from 'node-fetch';

let matte = "66621409462";
let edy = "40767396892";
let stato = true;
let happy = false;

let frasiMatte = [
  "Occhio a come parli che sei con mio fratello",
  "Sei un poveraccio, lascia stare Matte",
  "Non toccare Matte o ti trovi il bot nel letto",
  "Matte è il mio fratello, attento come ti muovi",
  "Tocchi Matte e ti tocca il karma"
];

let frasiHappy = [
  "Ehi non toccare il mio Matte 💕",
  "Matte è il mio fratellone, attento 😌",
  "Siamo una squadra! Lascia stare Matte",
  "Sei bravo, ma non come Matte 😎",
  "Tutto l’amore per Matte oggi! 💖"
];

let frasiInsulti = [
  "Ti scoppio brutto coglione",
  "Mamma tua piange quando ti guarda",
  "Scusa, hai dimenticato l'intelligenza a casa?",
  "Ti hanno cresciuto col tutorial sbagliato",
  "Fai schifo come le stories dei tuoi amici"
];

let frasiEdy = [
  "Edy sei la vergogna di WhatsApp",
  "Edy levati dal gruppo",
  "Edy ogni tuo messaggio è un danno",
  "Chi ti legge si pente della vita",
  "Manco i bot ti sopportano Edy"
];

// === API GPT fallback
async function usaAPI(text, isHappy = false) {
  let prompt = isHappy
    ? "Sei Ted in modalità affettuosa. Frasi brevi, ironiche e dolci:"
    : "Sei Ted incazzato. Frasi brevi, volgari, ironiche:";
  try {
    const res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt + "\n" + text)}`);
    const json = await res.json();
    return json.result;
  } catch {
    return null;
  }
}

export async function before(m, { conn, command, text }) {
  let msg = m.text?.toLowerCase() || "";
  let mittente = m.sender.replace(/[^0-9]/g, "");

  // Comandi
  if (command === 'banana') {
    return conn.reply(m.chat, `Il tuo ID è: ${m.sender}`, m);
  }

  if (msg.includes("ted fatti sentire") && mittente === matte) {
    stato = true;
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m);
  }

  if (msg.includes("ted calma") && mittente === matte) {
    stato = false;
    return conn.reply(m.chat, "Va bene fratello, sto zitto...", m);
  }

  if (command === 'happy') {
    happy = true;
    return conn.reply(m.chat, "Modalità happy attiva 🧸");
  }

  if (command === 'normal') {
    happy = false;
    return conn.reply(m.chat, "Modalità normale attiva ☠️");
  }

  // Se disattivo, non risponde
  if (!stato) return;

  if (m.quoted && m.quoted.fromMe) {
    let risposte = [
      "Continua che ti meno",
      "Hai rotto fratè",
      "Manco tua madre ti risponde così tanto",
      "Smettila che non sei divertente"
    ];
    return conn.reply(m.chat, risposte[Math.floor(Math.random() * risposte.length)], m);
  }

  // Se taggano Matte
  if (m.mentionedJid && m.mentionedJid.includes(matte + "@s.whatsapp.net")) {
    let frase = happy
      ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)]
      : frasiMatte[Math.floor(Math.random() * frasiMatte.length)];
    return conn.reply(m.chat, frase, m);
  }

  // Se taggano Edy
  if (m.mentionedJid && m.mentionedJid.includes(edy + "@s.whatsapp.net")) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m);
  }

  // Se citano "matte" senza tag
  if (msg.includes("matte")) {
    let frase = happy
      ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)]
      : frasiMatte[Math.floor(Math.random() * frasiMatte.length)];
    return conn.reply(m.chat, frase, m);
  }

  // Altri utenti — GPT fallback
  if (mittente !== matte) {
    let risposta = frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)];
    const fallback = await usaAPI(msg, happy);
    return conn.reply(m.chat, fallback || risposta, m);
  }
}

export const command = ['banana', 'happy', 'normal'];
export const tags = ['fun'];
export const help = ['banana', 'happy', 'normal'];