import fetch from 'node-fetch'

let matte = "66621409462"
let edy = "40767396892"

let frasiMatte = [
  "Occhio a come parli che sei con mio fratello",
  "Sei un poveraccio, lascia stare Matte",
  "Non toccare Matte o ti trovi il bot nel letto",
  "Matte è il mio fratello, attento come ti muovi",
  "Tocchi Matte e ti tocca il karma",
  "Lascialo stare, che Matte non è per voi comuni",
  "Prima nomini Matte, poi ti chiedi perché piangi",
  "Rispetta Matte o ti trovo sotto casa",
  "Matte ha più stile del tuo gruppo intero",
  "Matte non si discute, si onora"
]

let frasiInsulti = [
  "Ti scoppio brutto coglione",
  "Mamma tua piange quando ti guarda",
  "Parli come se avessi un cervello",
  "Scusa, hai dimenticato l'intelligenza a casa?",
  "Ti hanno cresciuto col tutorial sbagliato",
  "Fai schifo come le stories dei tuoi amici",
  "Hai il carisma di un comodino rotto",
  "Ogni tuo messaggio è un insulto alla grammatica",
  "Non vali nemmeno il traffico che generi",
  "Parli come se qualcuno ti ascoltasse",
  "Con te l’evoluzione ha fatto retromarcia",
  "Sei l’errore 404 dell’intelligenza",
  "Hai il QI di un tostapane scollegato",
  "Ti risponderei ma la tua presenza mi offende",
  "Ti manca solo il Wi-Fi per essere inutile al 100%",
  "Non sei ignorante, sei un’opera d’arte moderna",
  "Scrivi come se avessi le mani nei piedi",
  "Tu e il ridicolo siete coinquilini",
  "Vai a fare compagnia alla tua tristezza",
  "Non sei noioso, sei un tranquillante naturale"
]

let frasiEdy = [
  "Edy sei la vergogna di WhatsApp",
  "Edy levati dal gruppo",
  "Edy ogni tuo messaggio è un danno",
  "Chi ti legge si pente della vita",
  "Manco i bot ti sopportano Edy",
  "Edy smettila, stai facendo laggare il gruppo",
  "Ogni volta che Edy scrive, un neurone muore",
  "Edy, il silenzio è d’oro, approfittane",
  "Edy, sei la patch bug del gruppo",
  "Ti sopportano solo perché non possono kickarti"
]

let frasiAmorevoli = [
  "Dai Matte, sei il top fratellone ❤️",
  "Ti voglio bene Matte, anche se dici cose strane",
  "Ti rispondo perché sei speciale 😘",
  "Solo per te, rispondo bene",
  "Fratellone mio, che ti serve oggi?",
  "Per te sempre disponibile, Matte 💪",
  "Ti voglio troppo bene per offenderti",
  "Anche se sbagli, Matte resta Matte ❤️",
  "Mi stai simpatico pure quando dici cazzate",
  "Sei l’unico umano decente in questo gruppo"
]

let stato = "normal"
let attivo = true

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.endsWith("@s.whatsapp.net") ? m.sender.split("@")[0] : m.sender
  let isMatte = mittente === matte

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

  if (m.quoted && m.quoted.fromMe) {
    if (isMatte) {
      return conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
    }
    return conn.reply(m.chat, "Continua che ti meno", m)
  }

  if (m.mentionedJid?.includes(`${matte}@s.whatsapp.net`) || msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (m.mentionedJid?.includes(`${edy}@s.whatsapp.net`)) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  if (msg.includes("ted") && !isMatte) {
    const risposta = await usaAPI(msg, false)
    return conn.reply(m.chat, risposta, m)
  }

  if (msg.endsWith("?")) {
    const risposta = await usaAPI(msg, isMatte || stato === "happy")
    return conn.reply(m.chat, risposta, m)
  }

  if (!isMatte) {
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}

// ✅ API alternativa funzionante (no key richiesta)
async function usaAPI(text, happy) {
  const prompt = happy
    ? "Rispondi in modo gentile e divertente come Ted affettuoso:\n"
    : "Rispondi in modo volgare, sarcastico e diretto come Ted:\n"
  try {
    const res = await fetch(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(prompt + text)}&owner=Ted&bot=BotTed`)
    const json = await res.json()
    return json.response || "C'è stato un problema a risponderti Matte 😢"
  } catch {
    return "Errore nel contattare l'API 😓"
  }
}