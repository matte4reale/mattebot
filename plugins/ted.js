import fetch from 'node-fetch'

let matte = "66621409462"
let edy = "40767396892"
let stato = true
let happy = false

let frasiMatte = [
  "Occhio a come parli che sei con mio fratello",
  "Sei un poveraccio, lascia stare Matte",
  "Non toccare Matte o ti trovi il bot nel letto",
  "Matte è il mio fratello, attento come ti muovi",
  "Tocchi Matte e ti tocca il karma"
]

let frasiInsulti = [
  "Ti scoppio brutto coglione",
  "Mamma tua piange quando ti guarda",
  "Parli come se avessi un cervello",
  "Scusa, hai dimenticato l'intelligenza a casa?",
  "Ti hanno cresciuto col tutorial sbagliato",
  "Fai schifo come le stories dei tuoi amici"
]

let frasiEdy = [
  "Edy sei la vergogna di WhatsApp",
  "Edy levati dal gruppo",
  "Edy ogni tuo messaggio è un danno",
  "Chi ti legge si pente della vita",
  "Manco i bot ti sopportano Edy"
]

let risposteBot = [
  "Continua che ti meno",
  "Hai rotto fratè",
  "Manco tua madre ti risponde così tanto",
  "Smettila che non sei divertente"
]

let frasiHappy = [
  "Dai raga vogliamoci bene dai 🧸",
  "Oggi sono tranquillo, lasciate stare Matte",
  "Matte è il mio migliore amico, non toccatelo",
  "Anche se mi insultate vi voglio bene ❤️",
  "Matte si sta facendo un panino, vi perdona"
]

async function usaAPI(msg, happy) {
  let prompt = happy
    ? "Sei Ted in versione buona e affettuosa. Rispondi con frasi simpatiche, dolci e divertenti in stile peluche."
    : "Sei Ted arrabbiato. Rispondi in modo volgare, ironico e provocatorio. Risposte brevi.";
  try {
    let res = await fetch("https://apis-starlights-team.koyeb.app/starlight/gemini?text=" + encodeURIComponent(prompt + "\n" + msg))
    let json = await res.json()
    return json.result
  } catch {
    return null
  }
}

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.replace(/[^0-9]/g, "")

  if (msg === '.happy' && mittente === matte) {
    happy = true
    return conn.reply(m.chat, "Modalità Happy attiva 🧸", m)
  }

  if (msg === '.normal' && mittente === matte) {
    happy = false
    return conn.reply(m.chat, "Modalità normale attiva ☠️", m)
  }

  if (msg.includes("ted fatti sentire") && mittente === matte) {
    stato = true
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m)
  }

  if (msg.includes("ted calma") && mittente === matte) {
    stato = false
    return conn.reply(m.chat, "Va bene fratello, sto zitto...", m)
  }

  if (!stato || m.fromMe || m.sender === conn.user.jid) return

  if (m.quoted && m.quoted.fromMe) {
    return conn.reply(m.chat, risposteBot[Math.floor(Math.random() * risposteBot.length)], m)
  }

  if (m.mentionedJid && m.mentionedJid.includes(matte + "@s.whatsapp.net")) {
    return conn.reply(m.chat, happy ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)] : frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (msg.includes("matte")) {
    return conn.reply(m.chat, happy ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)] : frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (m.mentionedJid && m.mentionedJid.includes(edy + "@s.whatsapp.net")) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  if (mittente !== matte) {
    let risposta = await usaAPI(msg, happy)
    if (risposta) return conn.reply(m.chat, risposta, m)
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}