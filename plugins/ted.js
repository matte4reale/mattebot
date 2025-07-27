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

let stato = true

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.replace(/[^0-9]/g, "")
  
  // Comandi vocali
  if (msg.includes("ted fatti sentire") && mittente === matte) {
    stato = true
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m)
  }

  if (msg.includes("ted calma") && mittente === matte) {
    stato = false
    return conn.reply(m.chat, "Va bene fratello, sto zitto...", m)
  }

  // Se disattivo non risponde
  if (!stato) return

  // Se è una risposta a un suo messaggio
  if (m.quoted && m.quoted.fromMe) {
    let risposte = [
      "Continua che ti meno",
      "Hai rotto fratè",
      "Manco tua madre ti risponde così tanto",
      "Smettila che non sei divertente"
    ]
    return conn.reply(m.chat, risposte[Math.floor(Math.random() * risposte.length)], m)
  }

  // Risposte quando qualcuno tagga Matte
  if (m.mentionedJid && m.mentionedJid.includes(matte + "@s.whatsapp.net")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // Risposte a frasi che includono "matte"
  if (msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // Insulta Edy pesantemente
  if (m.mentionedJid && m.mentionedJid.includes(edy + "@s.whatsapp.net")) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  // API GPT solo se non è Matte
  if (mittente !== matte) {
    let reply = frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)]
    return conn.reply(m.chat, reply, m)
  }
}