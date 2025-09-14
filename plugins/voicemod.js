import fs from 'fs'
import { exec } from 'child_process'
import path from 'path'

let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!m.quoted || !/audio/.test(m.quoted.mimetype || '')) {
    return conn.reply(m.chat, `🎤 Rispondi a un audio o vocale con:\n> *${usedPrefix + command} [chipmunk|deep|robot|reverse]*`, m)
  }

  let effect = args[0]?.toLowerCase()
  if (!effect || !['chipmunk', 'deep', 'robot', 'reverse'].includes(effect)) {
    return conn.reply(m.chat, `⚠️ Effetti disponibili:\n- chipmunk\n- deep\n- robot\n- reverse`, m)
  }

  let q = m.quoted
  let media = await q.download?.()
  if (!media) return conn.reply(m.chat, '❌ Non sono riuscito a scaricare il file audio.', m)

  let inputFile = path.join('./tmp', `input-${Date.now()}.mp3`)
  let outputFile = path.join('./tmp', `output-${Date.now()}.mp3`)

  fs.writeFileSync(inputFile, media)

  let filter
  switch (effect) {
    case 'chipmunk':
      filter = '-filter:a "asetrate=44100*1.5,aresample=44100,atempo=1.1"'
      break
    case 'deep':
      filter = '-filter:a "asetrate=44100*0.7,aresample=44100,atempo=1.2"'
      break
    case 'robot':
      filter = '-filter_complex "afftfilt=real=\'re*0.5\':imag=\'im*0.5\'"'
      break
    case 'reverse':
      filter = '-filter_complex "areverse"'
      break
  }

  exec(`ffmpeg -y -i ${inputFile} ${filter} ${outputFile}`, async (err) => {
    if (err) {
      console.error(err)
      return conn.reply(m.chat, '❌ Errore durante l\'elaborazione audio.', m)
    }

    let buff = fs.readFileSync(outputFile)
    await conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })

    fs.unlinkSync(inputFile)
    fs.unlinkSync(outputFile)
  })
}

handler.help = ['voicemod <effetto>']
handler.tags = ['fun', 'audio']
handler.command = /^voicemod$/i

export default handler