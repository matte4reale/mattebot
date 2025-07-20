 import fs from 'fs'

let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin }) => { if (m.text?.toLowerCase() === '.skipmarchio') { if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!') if (!global.marchioGame?.[m.chat]) return m.reply('⚠️ Non c'è nessuna partita attiva in questo gruppo!')

if (!isAdmin && !m.fromMe) {
  return m.reply('❌ *Questo comando può essere usato solo dagli admin!*')
}

clearTimeout(global.marchioGame[m.chat].timeout)
await conn.reply(m.chat, `🛑 *Gioco dei marchi interrotto dall'admin*\n✨ La risposta era: *${global.marchioGame[m.chat].risposta}*`, m)
delete global.marchioGame[m.chat]
return

}

if (global.marchioGame?.[m.chat]) { return m.reply('⚠️ C'è già una partita attiva in questo gruppo!') }

const cooldownKey = marchio_${m.chat} const lastGame = global.cooldowns?.[cooldownKey] || 0 const now = Date.now() const cooldownTime = 10000

if (now - lastGame < cooldownTime) { const remainingTime = Math.ceil((cooldownTime - (now - lastGame)) / 1000) return m.reply(⏳ *Aspetta ancora ${remainingTime} secondi prima di avviare un nuovo gioco!*) }

global.cooldowns = global.cooldowns || {} global.cooldowns[cooldownKey] = now

// Caricamento marchi da JSON let marchi = [] try { marchi = JSON.parse(fs.readFileSync('./plugin/marchi.json')) } catch (e) { console.error('Errore nel leggere il file JSON marchi:', e) return m.reply('❌ Errore nel caricamento dei marchi da JSON.') }

let scelta = marchi[Math.floor(Math.random() * marchi.length)]

try { let msg = await conn.sendMessage(m.chat, { image: { url: scelta.url }, caption: 🚘 *INDOVINA IL MARCHIO!* 🚘\n\n ㌌ *Rispondi con il nome della casa automobilistica!*\n⏱️ *Tempo disponibile:* 30 secondi\n\n> \vare ✧ bot``, quoted: m })

global.marchioGame = global.marchioGame || {}
global.marchioGame[m.chat] = {
  id: msg.key.id,
  risposta: scelta.nome.toLowerCase(),
  rispostaOriginale: scelta.nome,
  tentativi: {},
  suggerito: false,
  startTime: Date.now(),
  timeout: setTimeout(() => {
    if (global.marchioGame?.[m.chat]) {
      conn.reply(m.chat, `⏳ *Tempo scaduto!*\n\n🚘 *La risposta era:* *${scelta.nome}*\n\n> \`vare ✧ bot\``, msg)
      delete global.marchioGame[m.chat]
    }
  }, 30000)
}

} catch (e) { console.error(e) m.reply('❌ Errore durante l'avvio del gioco. Riprova.') } }

handler.before = async (m, { conn }) => { const chat = m.chat const game = global.marchioGame?.[chat]

if (!game || !m.quoted || m.quoted.id !== game.id || m.key.fromMe) return

const normalize = str => str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^\w\s]/gi, '').trim() const userAnswer = normalize(m.text || '') const correctAnswer = normalize(game.risposta)

if (!userAnswer || userAnswer.length < 2) return

const isCorrect = userAnswer === correctAnswer || correctAnswer.includes(userAnswer) || userAnswer.includes(correctAnswer)

if (isCorrect) { clearTimeout(game.timeout) const timeTaken = Math.round((Date.now() - game.startTime) / 1000) let reward = 20 + Math.floor(Math.random() * 20) let exp = 500

if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {}
global.db.data.users[m.sender].euro = (global.db.data.users[m.sender].euro || 0) + reward
global.db.data.users[m.sender].exp = (global.db.data.users[m.sender].exp || 0) + exp

await conn.reply(chat, `✅ *RISPOSTA CORRETTA!*\n\n🏁 *Marchio:* ${game.rispostaOriginale}\n⏱️ *Tempo:* ${timeTaken}s\n🎁 *${reward}€*, *${exp}XP*\n\n> \`vare ✧ bot\``, m)
delete global.marchioGame[chat]

} else { game.tentativi[m.sender] = (game.tentativi[m.sender] || 0) + 1 const tentativiRimasti = 3 - game.tentativi[m.sender]

if (tentativiRimasti <= 0) {
  return conn.reply(chat, '❌ *Hai esaurito i tuoi 3 tentativi!*', m)
} else if (tentativiRimasti === 1) {
  await conn.reply(chat, `❌ *Sbagliato!*\n💡 *Inizia con:* ${game.rispostaOriginale[0].toUpperCase()}\n🔤 *Lettere:* ${game.rispostaOriginale.length}`, m)
} else {
  await conn.reply(chat, `❌ *Sbagliato!*\n📝 *Tentativi rimasti:* ${tentativiRimasti}`, m)
}

} }

handler.command = /^(marchio|skipmarchio)$/i handler.help = ['marchio'] handler.tags = ['giochi'] handler.group = true handler.register = true

export default handler

