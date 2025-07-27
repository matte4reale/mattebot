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

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.endsWith("@s.whatsapp.net") ? m.sender.split("@")[0] : m.sender

  if (msg.startsWith(".happy") && mittente === matte) {
    stato = "happy"
    return conn.reply(m.chat, "🟢 Modalità felice attivata!", m)
  }
  if (msg.startsWith(".normal") && mittente === matte) {
    stato = "normal"
    return conn.reply(m.chat, "⚪ Modalità normale attivata.", m)
  }
  if (msg.includes("ted fatti sentire") && mittente === matte) {
    stato = "normal"
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m)
  }
  if (msg.includes("ted calma") && mittente === matte) {
    stato = "muto"
    return conn.reply(m.chat, "Va bene fratello, sto zitto...", m)
  }
  if (stato === "muto") return

  if (m.quoted && m.quoted.fromMe) {
    if (mittente === matte) {
      return conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
    }
    return conn.reply(m.chat, "Continua che ti meno", m)
  }

  if (m.mentionedJid && m.mentionedJid.includes(`${matte}@s.whatsapp.net`)) {
    if (msg.includes("coglione") || msg.includes("stronzo") || msg.includes("idiota")) {
      return conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
    }
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (m.mentionedJid && m.mentionedJid.includes(`${edy}@s.whatsapp.net`)) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  if (m.fromMe) return

  if (msg.endsWith("?")) {
    if (mittente === matte) {
      try {
        let res = await fetch(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(msg)}`)
        let json = await res.json()
        if (json.response) return conn.reply(m.chat, json.response, m)
        else return conn.reply(m.chat, "C'è stato un problema a risponderti Matte 😢", m)
      } catch (e) {
        return conn.reply(m.chat, "Errore nel contattare l'API 😓", m)
      }
    } else {
      return conn.reply(m.chat, "Non lo so, ma sembri comunque stupido a chiederlo.", m)
    }
  }

  if (mittente !== matte) {
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}