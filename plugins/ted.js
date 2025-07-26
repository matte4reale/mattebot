let tedAttivo = true;
let modalitàInsulti = false;
let bersaglioInsulti = null;

const edyJID = "40767396892@s.whatsapp.net";
const matteJID = "66621409462@s.whatsapp.net";

const insultiEdy = [
  "🐻 Ted dice: Edy, l’unico virus sei tu.",
  "🐻 Ted dice: Edy, persino ChatGPT si rifiuta di parlare con te.",
  "🐻 Ted dice: Edy, tua madre ti ha chiamato errore di sistema.",
  "🐻 Ted dice: Edy, ogni volta che scrivi, Dio piange.",
];

const difeseMatte = [
  "🐻 Ted dice: Matte ti umilia anche solo esistendo.",
  "🐻 Ted dice: Guardati, Matte ti ha già demolito senza rispondere.",
  "🐻 Ted dice: Lascia stare Matte, non sei pronto.",
  "🐻 Ted dice: Matte ha pietà di te. Io no.",
];

const frasiRandom = [
  "🐻 Ted dice: tua madre viene con te, anaffettivo.",
  "🐻 Ted dice: hai 3 neuroni in sciopero.",
  "🐻 Ted dice: ma ti sei guardato allo specchio prima di parlare?",
  "🐻 Ted dice: sei l'equivalente umano di un buffering eterno.",
];

export const handler = {
  command: /^(zitto palla di pelo|cazzo fratello stai sentendo questo)$/i,
  async handler(m, { conn, command }) {
    if (command.toLowerCase() === "zitto palla di pelo") {
      tedAttivo = false;
      await conn.sendMessage(m.chat, { text: "🐻 Ted si zittisce... per ora." }, { quoted: m });
    } else if (command.toLowerCase() === "cazzo fratello stai sentendo questo") {
      modalitàInsulti = true;
      if (m.quoted) {
        bersaglioInsulti = m.quoted.sender;
        await conn.sendMessage(m.chat, { text: "🐻 Ted dice: Adesso si fa sul serio." }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: "🐻 Ted dice: Devi rispondere al messaggio di chi devo insultare, genio." }, { quoted: m });
      }
    }
  },
};

export async function before(m, { conn }) {
  if (!tedAttivo || !m.text) return;

  const contieneMatte = /matte/i.test(m.text);
  const isEdy = m.sender === edyJID;

  if (modalitàInsulti && bersaglioInsulti && m.sender === bersaglioInsulti) {
    const frase = insultiEdy[Math.floor(Math.random() * insultiEdy.length)];
    await conn.sendMessage(m.chat, { text: frase }, { quoted: m });
    return;
  }

  if (contieneMatte) {
    const frase = isEdy
      ? insultiEdy[Math.floor(Math.random() * insultiEdy.length)]
      : difeseMatte[Math.floor(Math.random() * difeseMatte.length)];
    await conn.sendMessage(m.chat, { text: frase }, { quoted: m });
  }
}