import fetch from 'node-fetch';

let handler = m => m;

handler.all = async function (m) {
  if (!m.text || m.fromMe || m.sender === conn.user.jid) return;

  const text = m.text.toLowerCase();
  const mentioned = m.mentionedJid || [];
  const edy = '40767396892@s.whatsapp.net'; // numero Edy
  const matte = 'matte';

  // Risposte per "matte"
  const matteResponses = [
    '🐻 Ted: Oh oh, hai nominato Matte? Meglio che ti sciacqui la bocca.',
    '🐻 Ted: Matte è come Gesù, lo nomini invano e ti becchi un ceffone.',
    '🐻 Ted: Sei troppo scarso per scrivere anche solo "matte", vergognati.',
    '🐻 Ted: Ehi, lascia stare Matte o ti infilo un razzo nel naso.'
  ];

  // Insulti pesanti per Edy
  const edyInsults = [
    '🤡 Edy ha vinto il premio "faccia da schiaffi" 3 anni di fila.',
    '🧠 Edy ha un QI negativo, è un buco nero intellettuale.',
    '💩 Taggare Edy? È come parlare con un mocio Vileda.',
    '🚽 Edy è utile quanto una forchetta nel brodo.'
  ];

  // Altri insulti base (se taggano altri)
  const generalResponses = [
    '😒 Non taggare a caso, sembri Edy quando prova a parlare.',
    '😑 Ma che vuoi? Scrivi come un piccione zoppo.',
    '🙄 Sembri un personaggio generato da un bug di GTA.'
  ];

  // Se scrive "matte", rispondi
  if (text.includes(matte)) {
    let reply = matteResponses[Math.floor(Math.random() * matteResponses.length)];
    await conn.reply(m.chat, reply, m, { quoted: m });
    return;
  }

  // Se tagga Edy
  if (mentioned.includes(edy)) {
    let reply = edyInsults[Math.floor(Math.random() * edyInsults.length)];
    await conn.reply(m.chat, reply, m, { quoted: m });
    return;
  }

  // Se tagga altri
  if (mentioned.length > 0) {
    let reply = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    await conn.reply(m.chat, reply, m, { quoted: m });
    return;
  }

  try {
    const tedPrompt = `Rispondi come l'orso TED del film. Sii volgare, sarcastico, irriverente e diretto. Questa è la frase: "${m.text}"`;

    let apiRes = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(tedPrompt)}`);
    let json = await apiRes.json();

    if (json?.result) {
      await conn.reply(m.chat, json.result + '\n\n> 🐻 Plugin Ted by matte', m, { quoted: m });
    }
  } catch (err) {
    console.error('Errore GPT fallback:', err);
  }

  return !0;
};

export default handler;