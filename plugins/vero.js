let handler = async (m, { conn, isAdmin }) => {  
    const numeroAutorizzato = '639318481412@s.whatsapp.net'; // Sostituisci con il numero corretto

    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, {
            text: '❌ *Accesso negato!*\nscordati di essere come me😂🫵🏻',
        });
        return;
    }

    if (m.fromMe) return;
    if (isAdmin) throw 'ℹ️ *Sei già admin.*';

    try {
        await conn.sendMessage(m.chat, {
            text: '🌑 *Promozione in corso...*\n"la palermitana vi domina ahah"',
        });

        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('😤 *Fallito!*\nCoglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^vevo$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;