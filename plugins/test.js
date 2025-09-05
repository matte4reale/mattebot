import fetch from 'node-fetch'

const API_URL = 'https://leakosintapi.com/'
const API_TOKEN = '5484717659:W3pW6ggw'
const COSTO_RICHIESTA = 0.003

if (!global.db.data.leakCredits) global.db.data.leakCredits = {}

function getUserBalance(id) {
  if (!global.db.data.leakCredits[id]) {
    global.db.data.leakCredits[id] = { balance: 0 }
  }
  return global.db.data.leakCredits[id].balance
}

function updateUserBalance(id, amount) {
  if (!global.db.data.leakCredits[id]) {
    global.db.data.leakCredits[id] = { balance: 0 }
  }
  global.db.data.leakCredits[id].balance += amount
}

let leakHandler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply(`❌ Usa il comando così:\n.leak <email / nome / query>`)
  }

  let query = args.join(" ")
  let balance = getUserBalance(m.sender)

  if (balance < COSTO_RICHIESTA) {
    return m.reply(`❌ Crediti insufficienti!\n💰 Il costo di una ricerca è ${COSTO_RICHIESTA}$.\n\nSaldo attuale: ${balance.toFixed(3)}$`)
  }

  try {
    const body = {
      token: API_TOKEN,
      request: query,
      limit: 100,
      lang: "it",
      type: "json"
    }

    let res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    let data = await res.json()

    if (!data || !data.List || Object.keys(data.List).length === 0) {
      return m.reply("⚠️ Nessun risultato trovato per la query.")
    }

    updateUserBalance(m.sender, -COSTO_RICHIESTA)

    let text = `🔎 *Risultati per:* ${query}\n💳 Saldo rimanente: ${getUserBalance(m.sender).toFixed(3)}$\n\n`

    for (let db in data.List) {
      let info = data.List[db]
      text += `📂 *Database:* ${db}\n`
      text += `ℹ️ Info: ${info.InfoLeak || "N/A"}\n`

      if (info.Data) {
        for (let entry of info.Data.slice(0, 5)) {
          for (let key in entry) {
            text += `- *${key}:* ${entry[key]}\n`
          }
          text += "\n"
        }
      }
      text += "────────────────────\n"
    }

    await conn.sendMessage(m.chat, { text }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Errore nella richiesta API.")
  }
}

let saldoHandler = async (m) => {
  let balance = getUserBalance(m.sender)
  m.reply(`💳 Il tuo saldo è: ${balance.toFixed(3)}$`)
}

let ricaricaHandler = async (m, { args, isOwner }) => {
  if (!isOwner) return m.reply("❌ Solo l'owner può ricaricare i crediti!")
  if (args.length < 2) return m.reply("⚠️ Usa: .ricarica <@utente> <importo>")
  
  let user = args[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net"
  let amount = parseFloat(args[1])
  if (isNaN(amount)) return m.reply("⚠️ Importo non valido")

  updateUserBalance(user, amount)
  m.reply(`✅ Ricaricati ${amount}$ all'utente ${user}\nNuovo saldo: ${getUserBalance(user).toFixed(3)}$`)
}

leakHandler.command = /^leak$/i
saldoHandler.command = /^saldo$/i
ricaricaHandler.command = /^ricarica$/i

export default [leakHandler, saldoHandler, ricaricaHandler]