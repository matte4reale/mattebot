let matte = "66621409462" // ID di Matte (senza @s.whatsapp.net)
let stato = "normal" // Stato iniziale: "normal" o "happy"

let risposteAmichevoli = [
  "Ma certo fratellone ❤️",
  "Per te sempre una risposta col cuore 😎",
  "Sì Matte, ovvio!",
  "Hai sempre ragione tu fratello",
  "Ti voglio bene Matte 🫶"
]

let risposteAggressive = [
  "Ma che cazzo chiedi?",
  "Te lo potevi risparmiare",
  "Domanda inutile come te",
  "Fatti curare prima di parlare",
  "Hai sbagliato chat, poveraccio"
]

// Simulazione di una GPT finta (gratuita)
async function fakeGPT(question, isMatte = false) {
  if (isMatte) {
    return risposteAmichevoli[Math.floor(Math.random() * risposteAmichevoli.length)]
  } else {
    return risposteAggressive[Math.floor(Math.random() * risposteAggressive.length)]
  }
}

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.split("@")[0]

  // Comandi per cambiare modalità
  if (msg.startsWith(".happy") && mittente === matte) {
    stato = "happy"
    return conn.reply(m.chat, "🟢 Modalità felice attivata!", m)
  }

  if (msg.startsWith(".normal") && mittente === matte) {
    stato = "normal"
    return conn.reply(m.chat, "⚪ Modalità normale attivata.", m)
  }

  // Se è una domanda
  if (msg.endsWith("?")) {
    let isMatte = mittente === matte
    let risposta = await fakeGPT(msg, isMatte || stato === "happy")
    return conn.reply(m.chat, risposta, m)
  }

  // Se qualcuno tagga Matte
  if (m.mentionedJid?.includes(`${matte}@s.whatsapp.net`)) {
    return conn.reply(m.chat, "Occhio a come parli di Matte 💢", m)
  }

  // Non insultarsi da solo
  if (m.fromMe) return

  // Se il messaggio arriva da Matte: non insultarlo
  if (mittente === matte) return

  // Altri utenti: risposta in base allo stato
  if (stato === "normal") {
    return conn.reply(m.chat, risposteAggressive[Math.floor(Math.random() * risposteAggressive.length)], m)
  }

  if (stato === "happy") {
    return conn.reply(m.chat, "Oggi sono felice, ti rispondo bene... ma non approfittarne 😏", m)
  }
}