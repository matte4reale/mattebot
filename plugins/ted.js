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
  "Solo per te, rispondo bene",
  "Anche se mi insulti, Matte, io ti voglio bene lo stesso 💕"
]

let stato = "normal" // 'normal' o 'happy'

// Simulazione GPT "solo per Matte"
async function fakeGPT(question) {
  let risposte = [
    "Secondo me sì fratellone ❤️",
    "Per te sempre, la risposta è sì 😎",
    "È ovvio, Matte. Sempre il top.",
    "Bella domanda Matte, direi proprio di sì"
  ]
  return risposte[Math.floor(Math.random() * risposte.length)]
}

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.endsWith("@s.whatsapp.net") ? m.sender.split("@")[0] : m.sender
  let isMatte = mittente === matte

  // Modalità happy/normal
  if (msg.startsWith(".happy") && isMatte) {
    stato = "happy"
    return conn.reply(m.chat, "🟢 Modalità felice attivata!", m)
  }

  if (msg.startsWith(".normal") && isMatte) {
    stato = "normal"
    return conn.reply(m.chat, "⚪ Modalità normale attivata.", m)
  }

  // Se risponde a un messaggio del bot
  if (m.quoted && m.quoted.fromMe) {
    if (isMatte) {
      return conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
    }
    return conn.reply(m.chat, "Continua che ti meno", m)
  }

  // Se qualcuno tagga Matte
  if (m.mentionedJid && m.mentionedJid.includes(`${matte}@s.whatsapp.net`)) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // Se nel testo c'è "matte"
  if (msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // Se qualcuno tagga Edy
  if (m.mentionedJid && m.mentionedJid.includes(`${edy}@s.whatsapp.net`)) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  // Se il messaggio è del bot stesso
  if (m.fromMe) return

  // Se Matte tagga il bot e lo insulta
  if (isMatte && m.mentionedJid && m.mentionedJid.includes(conn.user.jid)) {
    if (
      msg.includes("coglione") ||
      msg.includes("stronzo") ||
      msg.includes("merda") ||
      msg.includes("cretino")
    ) {
      return conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
    }
  }

  // Se Matte fa una domanda
  if (isMatte && msg.endsWith("?")) {
    let risposta = await fakeGPT(msg)
    return conn.reply(m.chat, risposta, m)
  }

  // Nessuna risposta a domande degli altri
  if (msg.endsWith("?")) return

  // Insulti se non è Matte
  if (!isMatte) {
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}