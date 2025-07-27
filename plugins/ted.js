import fetch from 'node-fetch';

let happy = false;
const matte = '66621409462';
const edy = '40767396892';

const frasiNormali = [
  "Oh @nome, ma chi ti ha chiesto niente?",
  "Sei noioso come un film francese, @nome.",
  "@nome, hai finito di rompere i coglioni o vuoi una standing ovation?",
  "Zitto palla di pelo? Guarda che non sono tuo cugino pelato, @nome.",
  "@nome, te lo dice anche tua madre di smettere di taggare la gente",
  "Cazzo fratello stai sentendo questo? Sembra il monologo di un banana..."
];

const frasiHappy = [
  "Ehi @nome, tutto bene fratellino?",
  "Dai @nome, non fare così... ci vogliamo bene, no?",
  "Matte è il mio miglior amico, guai a chi lo tocca!",
  "Scommetto che Matte ora si sta facendo un panino e guardando cartoni",
  "Rispondo io per Matte, è impegnato a farsi i cavoli suoi ❤️",
  "Oggi siamo chill, @nome. Spargi amore, non tag!"
];

const frasiControEdy = [
  "Edy, ma vaffanculo va. Sempre in mezzo alle palle",
  "Sei il motivo per cui le mute non parlano, Edy.",
  "Edy, l'unica cosa che riesci a taggare è la tua dignità perduta",
  "Chi ha invitato Edy? Sul serio?",
  "Edy, anche il tuo telefono vuole bloccarti."
];

async function usaAPI(text, happyMode) {
  const prompt = happyMode
    ? "Sei Ted in versione affettuosa. Parli come un orsacchiotto simpatico con chi nomina o tagga Matte. Frasi brevi, dolci e ironiche:\n"
    : "Sei Ted incazzato. Rispondi con frasi sarcastiche, volgari e divertenti. Offendi gentilmente se serve. Frasi brevi:\n";
  try {
    const res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt + text)}`);
    const json = await res.json();
    return json.result;
  } catch (e) {
    return null;
  }
}

// COMANDI MANUALI
let handler = async function (m, { conn, command }) {
  const msg = m.text.toLowerCase();
  if (command === 'happy') {
    happy = true;
    return m.reply('Modalità Happy attiva 🧸');
  }
  if (command === 'normal') {
    happy = false;
    return m.reply('Modalità Normale attiva ☠️');
  }
  if (msg.includes('ted calma')) {
    happy = false;
    return m.reply('Okay mi zittisco... per ora 😒');
  }
  if (msg.includes('ted fatti sentire')) {
    happy = true;
    return m.reply('TED è tornato, bitches 🐻💥');
  }
};

// RISPOSTA AUTOMATICA A TUTTI I MESSAGGI
handler.all = async function (m, { conn }) {
  if (m.fromMe || m.sender === conn.user.jid) return;

  const testo = m.text?.toLowerCase() || '';
  const mittente = m.sender.split('@')[0];
  const menzionati = m.mentionedJid?.map(j => j.split('@')[0]) || [];

  if (menzionati.includes(matte) && m.sender.split('@')[0] !== conn.user.jid.split('@')[0]) {
    const frase = happy
      ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)]
      : frasiNormali[Math.floor(Math.random() * frasiNormali.length)];
    return conn.reply(m.chat, frase.replace('@nome', mittente), m);
  }

  if (menzionati.includes(edy)) {
    const frase = frasiControEdy[Math.floor(Math.random() * frasiControEdy.length)];
    return conn.reply(m.chat, frase, m);
  }

  if ((menzionati.includes(matte) || testo.includes('matte')) && m.sender !== conn.user.jid) {
    const risposta = await usaAPI(testo, happy);
    if (risposta) {
      return conn.reply(m.chat, risposta, m);
    }
  }
};

handler.command = ['happy', 'normal'];
handler.help = ['happy', 'normal'];
handler.tags = ['fun'];

export default handler;