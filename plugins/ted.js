import fetch from 'node-fetch'

let matte = "66621409462"
let edy = "40767396892"

let frasiMatte = [ /*...le tue tante frasi di prima...*/ ]
let frasiInsulti = [ /*...le frasi insultanti...*/ ]
let frasiEdy = [ /*...*/ ]
let frasiAmorevoli = [ /*...*/ ]

let stato = "normal"
let attivo = true

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.split("@")[0]
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

  if (msg.startsWith("ted") && !isMatte) {
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

// ✅ Integrazione con OpenRouter (API key necessaria ma gratuita fino a 50 richieste/giorno)
async function usaAPI(text, isMatte) {
  const messages = [{ role: "user", content: text }]
  const body = JSON.stringify({
    model: "openai/gpt-3.5-turbo",
    messages
  })

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json"
      },
      body
    })
    const json = await res.json()
    const reply = json.choices?.[0]?.message?.content
    if (!reply) throw new Error("No reply")
    return reply.trim()
  } catch (e) {
    return isMatte
      ? "C'è stato un problema a risponderti Matte 😢"
      : "Errore nel contattare l'AI 😓"
  }
}