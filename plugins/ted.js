import fetch from 'node-fetch'

let matte = "66621409462"
let edy = "40767396892"

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

let frasiAmorevoli = [
  "Dai Matte, sei il top fratellone ❤️",
  "Ti voglio bene Matte, anche se dici cose strane",
  "Ti rispondo perché sei speciale 😘",
  "Solo per te, rispondo bene"
]

let stato = "normal"
let attivo = true

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.endsWith("@s.whatsapp.net") ? m.sender.split("@")[0] : m.sender
  let isMatte = mittente === matte

  // Zittisci o riattiva
  if (msg.includes("ted calma") && isMatte) {
    attivo = false
    return conn.reply(m.chat, "Va bene fratello, sto zitto...", m)
  }

  if (msg.includes("ted fatti sentire") && isMatte) {
    attivo = true
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m)
  }

  if (msg.startsWith(".happy") && isMatte) {
    stato = "happy"
    return conn.reply(m.chat, "🟢 Modalità felice attivata!", m)
  }

  if (msg.startsWith(".normal") && isMatte) {
    stato = "normal"
    return conn.reply(m.chat, "⚪ Modalità normale attivata.", m)
  }

  if (!attivo || m.fromMe) return

  // Se risponde a un messaggio del bot
  if (m.quoted && m.quoted.fromMe) {
    if (isMatte) {
      return conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
    }
    return conn.reply(m.chat, "Continua che ti meno", m)
  }

  // Tag o nome di Matte
  if (m.mentionedJid?.includes(`${matte}@s.whatsapp.net`) || msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // Tag Edy
  if (m.mentionedJid?.includes(`${edy}@s.whatsapp.net`)) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  // Risposte solo alle domande
  if (msg.endsWith("?")) {
    const risposta = await usaAPI(msg, stato === "happy" || isMatte)
    return conn.reply(m.chat, risposta, m)
  }

  // Resto dei messaggi
  if (!isMatte) {
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}

// API Gemini gratuita (no key richiesta)
async function usaAPI(text, happy) {
  const prompt = happy
    ? "Sei Ted in versione affettuosa. Parla dolcemente, con ironia, e rispondi in modo simpatico:\n"
    : "Sei Ted in versione volgare e diretta. Rispondi in modo sarcastico, breve e provocatorio:\n"
  try {
    const res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt + text)}`)
    const json = await res.json()
    return json.result || "C'è stato un problema a risponderti Matte 😢"
  } catch (e) {
    return "Errore nel contattare l'API 😓"
  }
}