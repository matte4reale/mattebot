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

let frasiHappy = [
  "Fratè, oggi siamo tutti amore ❤️",
  "Non litighiamo dai, abbracciamoci tutti 🧸",
  "Matte è il mio amico del cuore 💌",
  "Posso offrirti un sorriso invece di un insulto?",
  "Oggi il karma è gentile come me ✨"
]

async function usaAPI(text, happyMode) {
  let prompt = happyMode
    ? "Sei Ted in versione affettuosa. Parli come un orsacchiotto simpatico con chi nomina o tagga Matte. Frasi brevi, dolci, e ironiche:"
    : "Sei Ted incazzato. Rispondi con frasi sarcastiche, volgari e divertenti. Offendi gentilmente se serve. Frasi brevi."
  try {
    let res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt + "\n" + text)}`)
    let json = await res.json()
    return json.result
  } catch (e) {
    return null
  }
}

export async function before(m, { conn, text, command }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.replace(/[^0-9]/g, "")

  if (command === 'happy' && mittente === matte) {
    happy = true
    return conn.reply(m.chat, "Modalità Happy attiva 🧸", m)
  }

  if (command === 'normal' && mittente === matte) {
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

  let isReplyToBot = m.quoted?.fromMe
  let mentioned = m.mentionedJid?.map(j => j.replace(/[^0-9]/g, "")) || []

  if (isReplyToBot) {
    let risposte = [
      "Continua che ti meno",
      "Hai rotto fratè",
      "Manco tua madre ti risponde così tanto",
      "Smettila che non sei divertente"
    ]
    return conn.reply(m.chat, risposte[Math.floor(Math.random() * risposte.length)], m)
  }

  if (mentioned.includes(matte)) {
    let frase = happy
      ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)]
      : frasiMatte[Math.floor(Math.random() * frasiMatte.length)]
    return conn.reply(m.chat, frase, m)
  }

  if (msg.includes("matte")) {
    let frase = happy
      ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)]
      : frasiMatte[Math.floor(Math.random() * frasiMatte.length)]
    return conn.reply(m.chat, frase, m)
  }

  if (mentioned.includes(edy)) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  if (mittente !== matte) {
    let apiResponse = await usaAPI(msg, happy)
    if (apiResponse) {
      return conn.reply(m.chat, apiResponse, m)
    } else {
      let fallback = happy
        ? frasiHappy[Math.floor(Math.random() * frasiHappy.length)]
        : frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)]
      return conn.reply(m.chat, fallback, m)
    }
  }
}

export const command = ['happy', 'normal']
export const tags = ['fun']
export const help = ['happy', 'normal']