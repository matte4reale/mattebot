const { areJidsSameUser } = require("@whiskeysockets/baileys")

// Inserisci qui i numeri autorizzati
const NUMERI_AUTORIZZATI = ['393xxxxxxxx', '393yyyyyyyy']  // <-- METTI I NUMERI GIUSTI QUI

module.exports = {
  name: 'groupFilter',
  type: 'event',
  async handler(msg, { conn }) {
    const { participants, id, isGroup, from, messageStubType, messageStubParameters, participant, sender } = msg;

    // Se riceve un messaggio privato con un link di gruppo
    if (!isGroup && msg?.message?.conversation?.includes('chat.whatsapp.com/')) {
      const link = msg.message.conversation.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/);
      if (link) {
        try {
          const groupInfo = await conn.groupGetInviteInfo(link[1]);
          if (groupInfo.size < 30) {
            await conn.sendMessage(from, {
              text: `❌ Questo gruppo ha meno di 30 membri.\nAumentate i membri e invitatemi di nuovo.`,
            });
          }
        } catch (err) {
          await conn.sendMessage(from, { text: `⚠️ Errore nel controllare il gruppo.` });
        }
      }
    }

    // Se il bot viene aggiunto a un gruppo manualmente
    if (messageStubType === 27 || messageStubType === 'add') {
      try {
        const metadata = await conn.groupMetadata(id);
        const size = metadata.participants.length;

        // Controllo se l'utente che ha aggiunto il bot è autorizzato
        const autorizzato = NUMERI_AUTORIZZATI.some(numero =>
          areJidsSameUser(numero + '@s.whatsapp.net', participant)
        );

        if (size < 30 && !autorizzato) {
          await conn.sendMessage(id, {
            text: `❌ Questo gruppo ha meno di 30 membri.\nAumentate i membri e invitatemi di nuovo.`,
          });
          await conn.groupLeave(id);
        }
      } catch (e) {
        console.error('[Errore gruppo]:', e);
      }
    }
  }
};