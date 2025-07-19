import fetch from 'node-fetch';

async function handler(m, { text }) {
  if (!text) return m.reply('📦 Inserisci un codice BRT. Esempio: !brt 123456789012');
  const codice = text.trim();
  const url = `https://vas.brt.it/vas/sped_numspe_par.htm?Nsped=${codice}`;

  const risposta = `📦 Codice: ${codice}
🔗 Tracciamento BRT: ${url}

✅ Visita il link per i dettagli del tracking.`;

  m.reply(risposta);
}

handler.help = ['brt <codice>'];
handler.command = /^brt$/i;
export default handler;