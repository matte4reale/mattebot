import fetch from 'node-fetch';

let happy = false;
const matte = "66621409462";
const edy = "40767396892";

const frasiNormali = [
  "Oh @nome, ma chi ti ha chiesto niente?",
  "Sei noioso come un film francese, @nome.",
  "@nome, hai finito di rompere i coglioni o vuoi una standing ovation?",
  "@nome, te lo dice anche tua madre di smettere di taggare la gente",
  "Cazzo fratello stai sentendo questo? Sembra il monologo di un banana..."
];

const frasiHappy = [
  "Ehi @nome, tutto bene fratellino?",
  "Dai @nome, non fare così... ci vogliamo bene, no?",
  "Matte è il mio miglior amico, guai a chi lo tocca!",
  "Rispondo io per Matte, è impegnato a farsi i cavoli suoi ❤️",
  "Oggi siamo chill, @nome. Spargi amore, non tag!"
];

const frasiControEdy = [
  "Edy, ma vaffanculo va. Sempre in mezzo alle palle",
  "Edy, anche il tuo telefono vuole bloccarti.",
  "Sei il motivo per cui le mute non parlano, Edy.",
  "Chi ha invitato Edy? Sul serio?"
];

async function usaAPI(text, happy) {
  const prompt = happy
    ? "Sei Ted in versione affettuosa. Parli come un orsacchiotto simpatico con chi nomina o tagga Matte. Frasi brevi, dolci, e ironiche:"
    : "Sei Ted incazzato. Rispondi con frasi sarcastiche, volgari e divertenti. Offendi gentilmente se serve. Frasi brevi.";

  try {
    const res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt + "\n" + text)}`);
    const json = await res.json();
    return json.result;
  } catch (e) {
    return null;
  }
}

let handler = async function (m, { conn, command }) {
  if (command === 'happy') {
    happy = true;
    return m.reply('Modalità Happy attiva 🧸✨');
  }
  if (command === 'normal') {
    happy = false;
    return m.reply('Modalità normale attiva ☠️');
  }
};

handler.all = async function (m, { conn }) {
  if (m.fromMe || m.sender === conn.user.jid) return;

  const testo = m.text.toLowerCase();
  const mittente = m.sender.split('@')[0];

  // Calma / riattiva
  if (testo.includes('ted calma')) {
    happy = false;
    return conn.reply(m.chat, 'Okay mi zittisco... per ora 😒', m);
  }
  if (testo.includes('ted fatti sentire')) {
    happy = true;
    return conn.reply(m.chat, 'TED è tornato, bitches 🐻💥', m);
  }

  const mention = m.mentionedJid?.map(j => j.split('@')[0]) || [];

  if (mention.includes(matte) && m.sender !== conn.user.jid) {
    let frase = happy
      ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)]
      : frasiNormali[Math.floor(Math.random() * frasiNormali.length)];
    return conn.reply(m.chat, frase.replace('@nome', mittente), m);
  }

  if (mention.includes(edy)) {
    let frase = frasiControEdy[Math.floor(Math.random() * frasiControEdy.length)];
    return conn.reply(m.chat, frase, m);
  }

  // Se qualcuno scrive "matte" nel messaggio
  if (testo.includes('matte') && m.sender !== conn.user.jid) {
    const rispostaAPI = await usaAPI(testo, happy);
    if (rispostaAPI) return conn.reply(m.chat, rispostaAPI, m);
  }
};

handler.command = ['happy', 'normal'];
export default handler;