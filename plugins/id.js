let handler = async (m, { conn }) => {
  if (m.text === ".ids") {
    return conn.reply(m.chat, m.sender, m)
  }
}
handler.command = /^\.ids$/
export default handler