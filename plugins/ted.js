let matte = "66621409462" // ID senza @s.whatsapp.net
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

let frasiRisposta = [
  "Continua che ti meno",
  "Hai rotto fratè",
  "Manco tua madre ti risponde così tanto",
  "Smettila che non sei divertente"
]

let stato = true

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.replace(/[^0-9]/g, "")
  let botJid = conn.user.jid.split('@')[0]

  // Comandi vocali da Matte
  if (msg.includes("ted fatti sentire") && mittente === matte) {
    stato = true
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m)
  }

  if (msg.includes("ted calma") && mittente === matte) {
    stato = false
    return conn.reply(m.chat, "Va bene fratello, sto zitto...", m)
  }

  // Evita che il bot risponda a sé stesso o se disattivato
  if (!stato || mittente === botJid) return

  // Se rispondono a un suo messaggio
  if (m.quoted && m.quoted.fromMe) {
    return conn.reply(m.chat, frasiRisposta[Math.floor(Math.random() * frasiRisposta.length)], m)
  }

  // Se qualcuno tagga Matte
  if (m.mentionedJid && m.mentionedJid.includes(matte + "@s.whatsapp.net")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // Se scrivono "matte"
  if (msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // Se taggano Edy
  if (m.mentionedJid && m.mentionedJid.includes(edy + "@s.whatsapp.net")) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  // Insulta altri utenti se non sono Matte
  if (mittente !== matte && mittente !== botJid) {
    let risposta = frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)]
    return conn.reply(m.chat, risposta, m)
  }
}