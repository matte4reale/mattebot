let matte = "66621409462"
let stato = 'normal'
let attivo = true
let edy = "40767396892"

// Frasi predefinite
let frasiMatte = [
  "Matte è il mio fratello, attento come ti muovi",
  "Non toccare Matte o ti trovi il bot nel letto",
  "Matte top, sempre 🔥"
]

let frasiInsulti = [
  "Continua che ti meno",
  "Ti riempio di adesivi brutti",
  "Chi ti ha dato la tastiera?",
  "Cambia WiFi, sei tossico"
]

let frasiEdy = [
  "Edy... no comment 😂",
  "Parli di Edy? Ahah buona fortuna",
  "Edy è nel mio cuore, ma fuori di testa 💥"
]

let frasiAmorevoli = [
  "Matte, sei il top fratellone ❤️",
  "Per te sempre amore Matte 😘",
  "Sei unico, bro!"
]

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.split('@')[0]
  if (mittente === conn.user?.jid?.split('@')[0]) return

  // Comandi speciali Matte
  if (msg.includes("ted calma") && mittente === matte) {
    attivo = false
    return conn.reply(m.chat, "Va bene Matte, mi zittisco... 🤫", m)
  }
  if (msg.includes("ted fatti sentire") && mittente === matte) {
    attivo = true
    return conn.reply(m.chat, "Eccomi qua Matte! 🫡", m)
  }
  if (!attivo) return

  if (msg.startsWith(".happy") && mittente === matte) {
    stato = "happy"
    return conn.reply(m.chat, "Modalità happy attiva 😄", m)
  }

  if (msg.startsWith(".normal") && mittente === matte) {
    stato = "normal"
    return conn.reply(m.chat, "Modalità normal attiva 😐", m)
  }

  // Protezione per risposte bot a se stesso
  if (m.quoted && m.quoted.fromMe) {
    return mittente === matte
      ? conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
      : conn.reply(m.chat, "Continua che ti meno", m)
  }

  // Riconoscimento Matte/Edy/menzioni
  if (m.mentionedJid?.includes(`${matte}@s.whatsapp.net`) || msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (m.mentionedJid?.includes(`${edy}@s.whatsapp.net`)) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  // Risposta alle domande di Matte tramite API
  if (mittente === matte && msg.endsWith("?")) {
    try {
      let res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(msg)}`)
      let data = await res.json()
      if (data && data.message) {
        return conn.reply(m.chat, data.message, m)
      } else {
        return conn.reply(m.chat, "Risposta non valida 😕", m)
      }
    } catch (e) {
      return conn.reply(m.chat, "C'è stato un problema a risponderti Matte 😢", m)
    }
  }

  // Risposte generiche ad altri
  if (msg.endsWith("?")) {
    if (stato === "happy") return conn.reply(m.chat, "Bella domanda! 😊", m)
    return conn.reply(m.chat, "Non lo so, ma chiedi a Matte magari", m)
  }

  if (mittente !== matte) {
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}