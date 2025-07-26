// Plugin interno TedBot – difende Matte, insulta Edy
const edyJID = "40767396892@s.whatsapp.net";
const matteNomi = ["matte", "@matte", "Matte", "MATTE"];

const insultiEdy = [
  "🐻 Ted dice: Edy, sei un errore di sistema. Persino Clippy di Microsoft ti batterebbe in un dibattito.",
  "🐻 Ted dice: Edy, se fossi più inutile ti appenderebbero a un muro come decorazione.",
  "🐻 Ted dice: Edy, sei la dimostrazione vivente che l'evoluzione può anche sbagliare.",
  "🐻 Ted dice: Edy, i tuoi neuroni stanno facendo sciopero permanente.",
  "🐻 Ted dice: Edy, ti prende pure un tostapane a logica.",
];

const difeseMatte = [
  "🐻 Ted dice: Lascia stare Matte, ha già abbastanza da fare a ignorare scimmie come te.",
  "🐻 Ted dice: Oh no, hai toccato Matte? Bravo, ora vedi se riesci a correre senza ginocchia.",
  "🐻 Ted dice: Matte non ti risponde perché ha dignità. Io no, quindi eccomi.",
  "🐻 Ted dice: Guardati allo specchio prima di parlare di Matte. Spoiler: perdi.",
  "🐻 Ted dice: Sei geloso di Matte? Capisco, lui ha il cervello.",
];

export async function before(m, { conn }) {
  if (!m.text) return;

  const contieneMatte = matteNomi.some(n => m.text.toLowerCase().includes(n.toLowerCase()));
  if (!contieneMatte) return;

  // Se il messaggio è di Edy, insulta
  if (m.sender === edyJID) {
    const frase = insultiEdy[Math.floor(Math.random() * insultiEdy.length)];
    await conn.sendMessage(m.chat, { text: frase }, { quoted: m });
  } else {
    // Altrimenti difende Matte
    const frase = difeseMatte[Math.floor(Math.random() * difeseMatte.length)];
    await conn.sendMessage(m.chat, { text: frase }, { quoted: m });
  }
}