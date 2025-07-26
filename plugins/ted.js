import fetch from 'node-fetch';

let happy =import fetch from 'node-fetch'

let happyMode = false
let silenzioso = false
let matte = '66621409462'
let edy = '40767396892'

let frasiMatte = [
  "Oh fratè lascia stare Matte, è più sensibile di quanto sembri.",
  "Matte è il mio bro, quindi calma le piume.",
  "Sei scemo? Non si parla così a Matte.",
  "Te lo dico una volta sola: lascia stare Matte.",
  "Matte è off-limits, ci pensa Ted a difenderlo.",
  "Occhio a come parli di Matte, amico.",
  "Matte non si tocca, chiaro?",
  "Mo te meno. Lascia Matte in pace.",
  "Chi tocca Matte tocca me.",
  "Guarda che mi parte l’orso se rompi a Matte."
]

let frasiEdy = [
  "Oh Edy, ma ancora parli? Hai finito il cervello o te lo sei venduto?",
  "Edy fratè, te lo dico col cuore: stai zitto.",
  "Ma Edy esiste ancora? Pensavo fosse un bug.",
  "Edy parla solo per sbaglio, confermi?",
  "Ogni volta che Edy scrive, un neurone muore.",
  "Edy, torna quando impari a scrivere senza bestemmiare dentro.",
  "Sei lo zimbello del gruppo Edy, sallo.",
  "Edy, pure un tostapane è più sveglio di te.",
  "Edy sei l’update che nessuno voleva.",
  "Parla meno Edy, pensa di più (se ci riesci)."
]

let frasiGeneriche = [
  "Oh fratè, che vuoi?",
  "Parli troppo, rilassati.",
  "Ma chi ti ha chiesto niente?",
  "Senti, fatti i fatti tuoi.",
  "Parla con me solo se hai un cervello funzionante.",
  "Non rompere che mi sto facendo una canna.",
  "Ti vedo confuso. Come la tua vita.",
  "Mi hai taggato? Che onore. Ora vattene.",
  "Bella zio, ma anche no.",
  "Più parli, più mi convinco che l'evoluzione sia un mito."
]

async function usaAPI(testo, modalità) {
  let mood = modalità === true ? 
    "Rispondi come Ted in modalità felice. Sei dolce, protettivo, amichevole, come un fratello maggiore. Non sei mai offensivo." :
    "Rispondi come Ted in modalità volgare. Sei sarcastico, offensivo, diretto e imprevedibile. Rispondi con frasi brevi ma pungenti. Offendi solo se provocato."
  let prompt = `${mood} Questa è la frase ricevuta: "${testo}"`
  try {
    let r = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`)
    let json = await r.json()
    return json?.result || null
  } catch (e) {
    return null
  }
}

let handler = async (m, { conn, text, command }) => {
  let msg = m.text?.toLowerCase() || ""
  if (command === 'ted') {
    if (!text) return conn.reply(m.chat, 'Parla chiaro, fratè.', m)
    let risposta = await usaAPI(text, happyMode)
    return conn.reply(m.chat, risposta || "Non ho capito un c***o.", m)
  }

  if (msg === ".happy" || msg === "ted fatti sentire") {
    happyMode = true
    silenzioso = false
    return conn.reply(m.chat, "Ok bro, ora sono nella mia modalità coccolosa. 💖", m)
  }

  if (msg === ".normal" || msg === "ted calma") {
    happyMode = false
    silenzioso = true
    return conn.reply(m.chat, "Va bene, mi zittisco... per ora. 😶", m)
  }

  if (silenzioso) return

  let mentioned = m.mentionedJid || []

  if (mentioned.includes(conn.user.jid)) return

  if (mentioned.includes(matte + "@s.whatsapp.net") && m.sender !== conn.user.jid) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (mentioned.includes(edy + "@s.whatsapp.net") && m.sender !== conn.user.jid) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  if (msg.includes("matte") && m.sender !== conn.user.jid) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (mentioned.length > 0 && m.sender !== matte + "@s.whatsapp.net") {
    return conn.reply(m.chat, frasiGeneriche[Math.floor(Math.random() * frasiGeneriche.length)], m)
  }

  if ((mentioned.includes(matte + "@s.whatsapp.net") || msg.includes("matte")) && m.sender !== conn.user.jid) {
    let risposta = await usaAPI(msg, happyMode)
    if (risposta) return conn.reply(m.chat, risposta, m)
  }
}

handler.command = ['ted']
handler.all = true
export default handler cugino pelato, @nome.", "@nome, te lo dice anche tua madre di smettere di taggare la gente", "Cazzo fratello stai sentendo questo? Sembra il monologo di un banana..." ];

const frasiHappy = [ "Ehi @nome, tutto bene fratellino?", "Dai @nome, non fare così... ci vogliamo bene, no?", "Matte è il mio miglior amico, guai a chi lo tocca!", "Scommetto che Matte ora si sta facendo un panino e guardando cartoni", "Rispondo io per Matte, è impegnato a farsi i cavoli suoi ❤️", "Oggi siamo chill, @nome. Spargi amore, non tag!" ];

const frasiControEdy = [ "Edy, ma vaffanculo va. Sempre in mezzo alle palle", "Sei il motivo per cui le mute non parlano, Edy.", "Edy, l'unica cosa che riesci a taggare è la tua dignità perduta", "Chi ha invitato Edy? Sul serio?", "Edy, anche il tuo telefono vuole bloccarti." ];

async function usaAPI(text, happy) { const prompt = happy ? Sei Ted in versione affettuosa. Parli come un orsacchiotto simpatico con chi nomina o tagga Matte. Frasi brevi, dolci, e ironiche: : Sei Ted incazzato. Rispondi con frasi sarcastiche, volgari e divertenti. Offendi gentilmente se serve. Frasi brevi.;

try { const res = await fetch( https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt + "\n" + text)} ); const json = await res.json(); return json.result; } catch (e) { return null; } }

let handler = async function (m, { conn, text, command }) { const msg = m.text.toLowerCase();

if (command === 'happy') { happy = true; return m.reply('Modalità Happy attiva 🧸✨'); } if (command === 'normal') { happy = false; return m.reply('Modalità normale attiva ☠️'); } if (msg.includes('ted calma')) { happy = false; return m.reply('Okay mi zittisco... per ora 😒'); } if (msg.includes('ted fatti sentire')) { happy = true; return m.reply('TED è tornato, bitches 🐻💥'); } };

handler.all = async function (m, { conn }) { if (m.fromMe || m.sender === conn.user.jid) return;

const msg = m.text.toLowerCase(); const mittente = m.sender.split('@')[0]; const menzionati = m.mentionedJid?.map(j => j.split('@')[0]) || [];

if (menzionati.includes(matte) && m.sender !== conn.user.jid) { const frase = happy ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)] : frasiNormali[Math.floor(Math.random() * frasiNormali.length)]; return conn.reply(m.chat, frase.replace('@nome', mittente), m); }

if (menzionati.includes(edy)) { const frase = frasiControEdy[Math.floor(Math.random() * frasiControEdy.length)]; return conn.reply(m.chat, frase, m); }

if ((menzionati.includes(matte) || msg.includes('matte')) && m.sender !== conn.user.jid) { const rispostaAPI = await usaAPI(msg, happy); if (rispostaAPI) return conn.reply(m.chat, rispostaAPI, m); } };

handler.command = ['happy', 'normal']; handler.tags = ['fun']; handler.help = ['happy', 'normal']; export default handler;

