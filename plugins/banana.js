let handler = async (m, { conn }) => {
  let id = m.sender;
  m.reply(`Il tuo ID è:\n${id}`);
};

handler.command = ['banana'];
handler.help = ['banana'];
handler.tags = ['info'];

export default handler;