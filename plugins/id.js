let handler = async (m, { conn }) => {
  if (m.text === ".id") {
    return conn.reply(m.chat, m.sender, m)
  }
}
handler.command = /^\.id$/
export default handler