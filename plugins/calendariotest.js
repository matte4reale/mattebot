import { createCanvas } from 'canvas'

global.calendario = global.calendario || {}

function getMonthDays(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getWeekDay(year, month, day) {
  return new Date(year, month, day).getDay() // 0=Dom,6=Sab
}

function drawCalendar(year, month, notes = {}) {
  const width = 1000
  const height = 800
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // sfondo
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, width, height)

  // titolo mese
  const mesi = [
    'Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
    'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'
  ]
  ctx.fillStyle = '#222'
  ctx.font = 'bold 50px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`${mesi[month]} ${year}`, width/2, 80)

  // intestazione giorni settimana
  const giorni = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom']
  ctx.font = 'bold 28px Arial'
  ctx.textAlign = 'center'
  giorni.forEach((g, i) => {
    ctx.fillText(g, 120 + i * 120, 140)
  })

  // griglia
  const giorniMese = getMonthDays(year, month)
  let start = getWeekDay(year, month, 1) 
  if (start === 0) start = 7 // domenica in fondo
  let day = 1
  const cellW = 120
  const cellH = 90

  ctx.font = '24px Arial'
  ctx.textAlign = 'right'

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      let x = 60 + col * cellW
      let y = 180 + row * cellH
      ctx.strokeStyle = '#ccc'
      ctx.strokeRect(x, y, cellW, cellH)

      if ((row === 0 && col+1 < start) || day > giorniMese) continue

      // numero del giorno
      ctx.fillStyle = '#333'
      ctx.fillText(day, x + cellW - 10, y + 30)

      // evidenzia se ha note
      let key = `${day}/${month+1}/${year}`
      if (notes[key]) {
        ctx.fillStyle = '#facc15'
        ctx.beginPath()
        ctx.arc(x + cellW/2, y + cellH - 25, 10, 0, Math.PI*2)
        ctx.fill()
      }

      day++
    }
  }

  return canvas.toBuffer()
}

let handler = async (m, { conn, args }) => {
  const chat = m.chat
  global.calendario[chat] = global.calendario[chat] || {}

  if (args.length === 0) {
    // mostra mese corrente
    let now = new Date()
    const buffer = drawCalendar(now.getFullYear(), now.getMonth(), global.calendario[chat])
    return conn.sendMessage(chat, { image: buffer, caption: '🗓 Calendario' }, { quoted: m })
  }

  if (args[0].includes('/')) {
    let [gg, mm, aaaa] = args[0].split('/').map(n => parseInt(n))
    if (!gg || !mm || !aaaa) return m.reply('❌ Data non valida (usa gg/mm/aaaa)')

    const key = `${gg}/${mm}/${aaaa}`

    if (args.length > 1) {
      // aggiungi nota
      const testo = args.slice(1).join(' ')
      global.calendario[chat][key] = global.calendario[chat][key] || []
      global.calendario[chat][key].push(testo)
      return m.reply(`✅ Nota aggiunta al ${key}`)
    } else {
      // mostra note
      if (!global.calendario[chat][key]) return m.reply(`📭 Nessuna nota per il ${key}`)
      let msg = `🗓 Note per il ${key}:\n\n`
      global.calendario[chat][key].forEach((t, i) => { msg += `• ${t}\n` })
      return m.reply(msg)
    }
  }
}

handler.command = /^calendario$/i
export default handler