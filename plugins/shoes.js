const scarpe = [
  { name: "Nike Air Force 1", brand: "Nike", sizes: {36: 110, 37:112, 38:115, 39:117, 40:120, 41:122, 42:125, 43:128, 44:130} },
  { name: "Nike Dunk Low", brand: "Nike", sizes: {36: 120, 37:122, 38:125, 39:127, 40:130, 41:132, 42:135, 43:138, 44:140} },
  { name: "Air Jordan 1", brand: "Nike", sizes: {36: 180, 37:182, 38:185, 39:187, 40:190, 41:192, 42:195, 43:198, 44:200} },
  { name: "Yeezy 350", brand: "Adidas", sizes: {36: 220, 37:222, 38:225, 39:227, 40:230, 41:232, 42:235, 43:238, 44:240} },
  { name: "Converse Chuck Taylor", brand: "Converse", sizes: {36: 75, 37:77, 38:79, 39:81, 40:83, 41:85, 42:87, 43:89, 44:90} },
  { name: "New Balance 550", brand: "New Balance", sizes: {36: 130, 37:132, 38:135, 39:137, 40:140, 41:142, 42:145, 43:148, 44:150} },
  { name: "Adidas Samba", brand: "Adidas", sizes: {36: 100, 37:102, 38:105, 39:107, 40:110, 41:112, 42:115, 43:118, 44:120} },
  { name: "Puma Suede", brand: "Puma", sizes: {36: 80, 37:82, 38:85, 39:87, 40:90, 41:92, 42:95, 43:98, 44:100} },
  { name: "Vans Old Skool", brand: "Vans", sizes: {36: 85, 37:87, 38:90, 39:92, 40:95, 41:97, 42:100, 43:103, 44:105} },
  { name: "Reebok Club C", brand: "Reebok", sizes: {36: 90, 37:92, 38:95, 39:97, 40:100, 41:102, 42:105, 43:108, 44:110} },
  { name: "Asics Gel-Lyte", brand: "Asics", sizes: {36: 110, 37:112, 38:115, 39:117, 40:120, 41:122, 42:125, 43:128, 44:130} },
  { name: "Jordan Delta", brand: "Nike", sizes: {36: 140, 37:142, 38:145, 39:147, 40:150, 41:152, 42:155, 43:158, 44:160} },
  { name: "Saucony Jazz", brand: "Saucony", sizes: {36: 95, 37:97, 38:100, 39:102, 40:105, 41:107, 42:110, 43:113, 44:115} },
  { name: "Fila Disruptor", brand: "Fila", sizes: {36: 85, 37:87, 38:90, 39:92, 40:95, 41:97, 42:100, 43:103, 44:105} },
  { name: "Under Armour Curry", brand: "Under Armour", sizes: {36: 130, 37:132, 38:135, 39:137, 40:140, 41:142, 42:145, 43:148, 44:150} },
  { name: "New Balance 990", brand: "New Balance", sizes: {36: 180, 37:182, 38:185, 39:187, 40:190, 41:192, 42:195, 43:198, 44:200} },
  { name: "Nike React", brand: "Nike", sizes: {36: 140, 37:142, 38:145, 39:147, 40:150, 41:152, 42:155, 43:158, 44:160} },
  { name: "Adidas NMD", brand: "Adidas", sizes: {36: 150, 37:152, 38:155, 39:157, 40:160, 41:162, 42:165, 43:168, 44:170} },
  { name: "Nike Zoom", brand: "Nike", sizes: {36: 130, 37:132, 38:135, 39:137, 40:140, 41:142, 42:145, 43:148, 44:150} },
  { name: "Air Jordan 11", brand: "Nike", sizes: {36: 220, 37:222, 38:225, 39:227, 40:230, 41:232, 42:235, 43:238, 44:240} },
  { name: "Adidas Gazelle", brand: "Adidas", sizes: {36: 95, 37:97, 38:100, 39:102, 40:105, 41:107, 42:110, 43:113, 44:115} },
  { name: "Nike Blazer", brand: "Nike", sizes: {36: 110, 37:112, 38:115, 39:117, 40:120, 41:122, 42:125, 43:128, 44:130} },
  { name: "Vans Sk8-Hi", brand: "Vans", sizes: {36: 95, 37:97, 38:100, 39:102, 40:105, 41:107, 42:110, 43:113, 44:115} },
  { name: "Nike Air Max 90", brand: "Nike", sizes: {36: 130, 37:132, 38:135, 39:137, 40:140, 41:142, 42:145, 43:148, 44:150} },
  { name: "Adidas Superstar", brand: "Adidas", sizes: {36: 100, 37:102, 38:105, 39:107, 40:110, 41:112, 42:115, 43:118, 44:120} },
  { name: "Reebok Classic", brand: "Reebok", sizes: {36: 90, 37:92, 38:95, 39:97, 40:100, 41:102, 42:105, 43:108, 44:110} },
  { name: "Puma RS-X", brand: "Puma", sizes: {36: 110, 37:112, 38:115, 39:117, 40:120, 41:122, 42:125, 43:128, 44:130} },
  { name: "Nike Air Presto", brand: "Nike", sizes: {36: 120, 37:122, 38:125, 39:127, 40:130, 41:132, 42:135, 43:138, 44:140} },
  { name: "Adidas ZX 750", brand: "Adidas", sizes: {36: 110, 37:112, 38:115, 39:117, 40:120, 41:122, 42:125, 43:128, 44:130} },
  { name: "New Balance 997", brand: "New Balance", sizes: {36: 150, 37:152, 38:155, 39:157, 40:160, 41:162, 42:165, 43:168, 44:170} },
  { name: "Nike Cortez", brand: "Nike", sizes: {36: 100, 37:102, 38:105, 39:107, 40:110, 41:112, 42:115, 43:118, 44:120} },
  { name: "Asics Gel-Kayano", brand: "Asics", sizes: {36: 140, 37:142, 38:145, 39:147, 40:150, 41:152, 42:155, 43:158, 44:160} },
  { name: "Jordan Mars 270", brand: "Nike", sizes: {36: 160, 37:162, 38:165, 39:167, 40:170, 41:172, 42:175, 43:178, 44:180} },
  { name: "Under Armour HOVR", brand: "Under Armour", sizes: {36: 130, 37:132, 38:135, 39:137, 40:140, 41:142, 42:145, 43:148, 44:150} },
];

function getImageUrl(brand) {
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(brand)},sneakers`;
}

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike air force 1`');

  const query = args.join(' ').toLowerCase();

  const scarpa = scarpe.find(
    s =>
      s.name.toLowerCase().includes(query) ||
      s.brand.toLowerCase().includes(query)
  );

  if (!scarpa) return m.reply('🔍 Nessuna scarpa trovata.');

  const prezzi = Object.entries(scarpa.sizes)
    .map(([taglia, prezzo]) => `- Taglia ${taglia}: ${prezzo} €`)
    .join('\n');

  const imageUrl = getImageUrl(scarpa.brand);

  const messaggio = `👟 *${scarpa.name.toUpperCase()}*\n💸 Prezzi per taglia:\n${prezzi}`;

  return conn.sendMessage(
    m.chat,
    { image: { url: imageUrl }, caption: messaggio },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;