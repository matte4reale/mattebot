let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike dunk low`');

  const modello = args.join(' ');
  const imageUrl = `https://source.unsplash.com/600x400/?${encodeURIComponent(modello)},sneakers`;

  const messaggio = `👟 *${modello.toUpperCase()}*\n\n📸 Immagine generica da Unsplash.\n🔍 Prezzi: Aggiungili tu o collegalo a un tuo database.`;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: imageUrl },
      caption: messaggio
    },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;