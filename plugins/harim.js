let handler = async (m, { conn }) => {
  const frames = [
    `        Origin‑Bot       Vare‑Bot       Onix‑Bot       Turbo‑Bot       Bixby‑Bot        `,
    `     Origin‑Bot  •  Vare‑Bot  •  Onix‑Bot  •  Turbo‑Bot  •  Bixby‑Bot     `,
    `  [Origin‑Bot] [Vare‑Bot] [Onix‑Bot] [Turbo‑Bot] [Bixby‑Bot]  `,
    `—=≡ Origin‑Bot ≡=— —=≡ Vare‑Bot ≡=— —=≡ Onix‑Bot ≡=— —=≡ Turbo‑Bot ≡=— —=≡ Bixby‑Bot ≡=—`,
    `     * Origin‑Bot *    * Vare‑Bot *    * Onix‑Bot *    * Turbo‑Bot *    * Bixby‑Bot *`,
    `⟦ Origin‑Bot ⟧ ⟦ Vare‑Bot ⟧ ⟦ Onix‑Bot ⟧ ⟦ Turbo‑Bot ⟧ ⟦ Bixby‑Bot ⟧`,
    `                ✦ CHATUNITY BOT ✦                `,
    `                ✦ CHATUNITY BOT ✦                `
  ];

  let msg = await conn.sendMessage(m.chat, { text: frames[0] }, { quoted: m });

  for (let i = 1; i < frames.length; i++) {
    await new Promise(r => setTimeout(r, 1100));
    try {
      await conn.sendMessage(m.chat, {
        text: frames[i],
        edit: msg.key
      });
    } catch (e) {
      await conn.sendMessage(m.chat, { delete: msg.key });
      msg = await conn.sendMessage(m.chat, { text: frames[i] });
    }
  }
};

handler.command = ['harim'];
export default handler;