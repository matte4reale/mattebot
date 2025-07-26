let matte = "66621409462"
let edy = "40767396892"
let attivo = true

let frasiMatte = [
  "Oh fratello, chi ti ha toccato?",
  "Sei il mio Jonny, che vuoi che ti dica.",
  "Qualsiasi cosa succeda, io sto con te, Matte.",
  "Fra ti voglio bene, ma davvero.",
  "Bro questi qui ti parlano pure? Ma che vergogna."
]

let frasiInsulti = [
  "Chi ti ha dato il permesso di parlare?",
  "Parli ancora? Nessuno ti ha chiesto niente.",
  "Ma chi cazzo ti conosce, sei inutile.",
  "Frate fai più schifo del lunedì mattina.",
  "Sei come il WiFi dei treni: inutile e lento.",
  "Torna nella fogna da dove sei venuto.",
  "Giuro che mi vergogno per te.",
  "Hai il QI di una sedia rotta.",
  "Tu esisti e già questo è un errore del sistema.",
  "Parli come se qualcuno ti stesse ascoltando."
]

let frasiEdy = [
  "Edy? Ma chi cazzo ti ha invitato?",
  "Oh Edy, manco tua madre ti sopporta.",
  "Bro sei la versione buggata dell’umanità.",
  "Sei il motivo per cui esiste il tasto blocca.",
  "Ogni volta che parli muore un neurone nel mondo.",
  "Dio ha smesso di seguirti tempo fa.",
  "Giuro che se ti vedo, cambio marciapiede.",
  "Edy, hai la personalità di un toast bruciato.",
  "Parli ancora? Nessuno ti ha mai dato il microfono.",
  "Oh Edy, sei il trailer di una tragedia umana."
]

let handler = async (m, { conn, text }) => {
  if (!attivo) return

  let sender = m.sender.split("@")[0]
  let msg = m.text.toLowerCase()

  // COMANDI
  if (msg.includes("ted calma")) {
    attivo = false
    return conn.reply(m.chat, "Okay sto zitto va bene? 😤", m)
  }

  if (msg.includes("ted fatti sentire")) {
    attivo = true
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m)
  }

  // RISPOSTA A MATTE
  if (msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  // SE VIENE RISPOSTO
  if (m.quoted && m.quoted.fromMe && m.quoted.text.includes("ted")) {
    if (m.sender.includes(matte)) {
      return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
    } else if (m.sender.includes(edy)) {
      return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
    } else {
      return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
    }
  }

  // SE VIENE NOMINATO UN NOME
  if (msg.includes("edy")) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  if (msg.includes("vale") || msg.includes("server") || msg.includes("broski")) {
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}

handler.all = true
export default handler