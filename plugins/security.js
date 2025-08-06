
let messaggioRifiuto = `❌ Questo gruppo ha meno di 30 membri.  
Aumentate i membri e invitatemi di nuovo.`

let numeriAutorizzati = ['1234567890@s.whatsapp.net', '0987654321@s.whatsapp.net']; // Sostituisci con i tuoi

export async function before(m, { conn }) {
  // Caso 1: Bot viene aggiunto a un gruppo
  if (m.isGroup && m.action === 'add' && m.participants?.includes(conn.user.jid)) {
    try {
      let metadata = await conn.groupMetadata(m.chat);
      let partecipanti = metadata.participants.map(p => p.id);
      let autorizzato = numeriAutorizzati.some(num => partecipanti.includes(num));

      if (metadata.participants.length < 30 && !autorizzato) {
        await conn.sendMessage(m.chat, { text: messaggioRifiuto });
        await conn.groupLeave(m.chat);
      }
    } catch (e) {
      console.log("Errore nel controllo del gruppo:", e);
    }
  }

  // Caso 2: Riceve un link di gruppo in privato
  if (!m.isGroup && m.text?.match(/chat\.whatsapp\.com\/[A-Za-z0-9]{20,24}/)) {
    let inviteCode = m.text.match(/chat\.whatsapp\.com\/([A-Za-z0-9]{20,24})/)?.[1];
    if (inviteCode) {
      try {
        let groupId = await conn.groupAcceptInvite(inviteCode);
        let metadata = await conn.groupMetadata(groupId);
        let partecipanti = metadata.participants.map(p => p.id);
        let autorizzato = numeriAutorizzati.some(num => partecipanti.includes(num));

        if (metadata.participants.length < 30 && !autorizzato) {
          await conn.sendMessage(groupId, { text: messaggioRifiuto });
          await conn.groupLeave(groupId);
        }
      } catch (e) {
        await conn.sendMessage(m.chat, { text: '❌ Link non valido o impossibile unirsi al gruppo.' });
      }
    }
  }
}