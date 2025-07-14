let linkGruppoNuovo = {};
let backupUtenti = {};
const numeriAutorizzati = ['393884769557', '66621409462'];

const handler = async (m, { conn, args, command, isAdmin, isBotAdmin }) => {
    const sender = m.sender.replace(/[^0-9]/g, '');

    if (!numeriAutorizzati.includes(sender)) {
        return m.reply('❌ Non sei autorizzato a usare questo comando.');
    }

    const chatId = m.chat;
    if (command === 'setgrupponuovo') {
        const link = args[0];
        if (!link || !link.startsWith('https://chat.whatsapp.com/')) {
            return m.reply('❗ Inserisci un link valido del nuovo gruppo WhatsApp.');
        }
        linkGruppoNuovo[chatId] = link;
        return m.reply('✅ Link del gruppo nuovo salvato con successo.');
    }

    if (command === 'backup') {
        const metadata = await conn.groupMetadata(chatId);
        const members = metadata.participants
            .filter(p => !p.admin) // escludi admin
            .map(p => p.id);

        backupUtenti[chatId] = members;
        return m.reply(`✅ Backup eseguito. Membri salvati: ${members.length}`);
    }

    if (command === 'haram') {
        if (!linkGruppoNuovo[chatId]) return m.reply('❌ Nessun link di gruppo nuovo è stato salvato. Usa `.setgrupponuovo <link>`');

        await conn.sendMessage(
            m.sender,
            {
                text: `🧨 Il gruppo è stato svuotato!\n\n🔁 Premi il bottone qui sotto per mandare il nuovo link (${linkGruppoNuovo[chatId]}) a tutti i membri espulsi.`,
                buttons: [
                    {
                        buttonId: `#inoltragrup ${chatId}`,
                        buttonText: { displayText: '📤 Inoltra il link' },
                        type: 1
                    }
                ],
                footer: '🔐 Solo utenti autorizzati',
                headerType: 1
            },
            { quoted: m }
        );
    }

    // comando nascosto per il bottone
    if (command === 'inoltragrup') {
        const chatTarget = args[0];
        const utenti = backupUtenti[chatTarget];
        const link = linkGruppoNuovo[chatTarget];

        if (!utenti || !link) return m.reply('❌ Backup o link mancante.');

        for (const u of utenti) {
            try {
                await conn.sendMessage(u, { text: `🔗 Nuovo gruppo: ${link}` });
            } catch (e) {
                console.log(`Errore invio a ${u}`);
            }
        }

        return m.reply(`✅ Link inviato in privato a ${utenti.length} utenti.`);
    }
};

handler.command = /^(setgrupponuovo|backup|haram|inoltragrup)$/i;

export default handler;
