"let handler = async (m, { args, conn }) => {
  const pagina = parseInt(args[0]) || 1;
  const perPagina = 100;
  const totali = scarpe.length;
  const pagineTotali = Math.ceil(totali / perPagina);

  if (pagina < 1 || pagina > pagineTotali)
    return m.reply(`âŒ Pagina non valida. Scegli tra 1 e ${pagineTotali}`);

  const inizio = (pagina - 1) * perPagina;
  const fine = pagina * perPagina;
  const lista = scarpe.slice(inizio, fine).map((s, i) => `${inizio + i + 1}. ${s.nome}`).join('\n');

  const messaggio = `ðŸ“¦ *LISTINO SCARPE* - Pagina ${pagina}/${pagineTotali}\n\n${lista}\n\nðŸ—‚ Totali: ${totali} scarpe`;

  return conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

const scarpe = [
  {
    "modello": "asics suede #1",
    "nome": "Asics Suede #1",
    "sku": "ASSU00001",
    "prezzo": "400",
    "immagine": "https://images.stockx.com/images/Asics-Suede-#1-Product.jpg",
    "link": "https://stockx.com/asics-suede-#1"
  },
  {
    "modello": "nike dunk #2",
    "nome": "Nike Dunk #2",
    "sku": "NIDU00002",
    "prezzo": "214",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-#2-Product.jpg",
    "link": "https://stockx.com/nike-dunk-#2"
  },
  {
    "modello": "adidas zoom #3",
    "nome": "Adidas Zoom #3",
    "sku": "ADZO00003",
    "prezzo": "319",
    "immagine": "https://images.stockx.com/images/Adidas-Zoom-#3-Product.jpg",
    "link": "https://stockx.com/adidas-zoom-#3"
  },
  {
    "modello": "yeezy zoom #4",
    "nome": "Yeezy Zoom #4",
    "sku": "YEZO00004",
    "prezzo": "346",
    "immagine": "https://images.stockx.com/images/Yeezy-Zoom-#4-Product.jpg",
    "link": "https://stockx.com/yeezy-zoom-#4"
  },
  {
    "modello": "jordan suede #5",
    "nome": "Jordan Suede #5",
    "sku": "JOSU00005",
    "prezzo": "361",
    "immagine": "https://images.stockx.com/images/Jordan-Suede-#5-Product.jpg",
    "link": "https://stockx.com/jordan-suede-#5"
  },
  {
    "modello": "converse air max #6",
    "nome": "Converse Air Max #6",
    "sku": "COAI00006",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#6-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#6"
  },
  {
    "modello": "reebok suede #7",
    "nome": "Reebok Suede #7",
    "sku": "RESU00007",
    "prezzo": "221",
    "immagine": "https://images.stockx.com/images/Reebok-Suede-#7-Product.jpg",
    "link": "https://stockx.com/reebok-suede-#7"
  },
  {
    "modello": "adidas dunk #8",
    "nome": "Adidas Dunk #8",
    "sku": "ADDU00008",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-#8-Product.jpg",
    "link": "https://stockx.com/adidas-dunk-#8"
  },
  {
    "modello": "puma dunk #9",
    "nome": "Puma Dunk #9",
    "sku": "PUDU00009",
    "prezzo": "264",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-#9-Product.jpg",
    "link": "https://stockx.com/puma-dunk-#9"
  },
  {
    "modello": "nike gel-lyte #10",
    "nome": "Nike Gel-Lyte #10",
    "sku": "NIGE00010",
    "prezzo": "177",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-#10-Product.jpg",
    "link": "https://stockx.com/nike-gel-lyte-#10"
  },
  {
    "modello": "converse zoom #11",
    "nome": "Converse Zoom #11",
    "sku": "COZO00011",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/Converse-Zoom-#11-Product.jpg",
    "link": "https://stockx.com/converse-zoom-#11"
  },
  {
    "modello": "jordan zoom #12",
    "nome": "Jordan Zoom #12",
    "sku": "JOZO00012",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#12-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#12"
  },
  {
    "modello": "asics suede #13",
    "nome": "Asics Suede #13",
    "sku": "ASSU00013",
    "prezzo": "148",
    "immagine": "https://images.stockx.com/images/Asics-Suede-#13-Product.jpg",
    "link": "https://stockx.com/asics-suede-#13"
  },
  {
    "modello": "jordan cortez #14",
    "nome": "Jordan Cortez #14",
    "sku": "JOCO00014",
    "prezzo": "192",
    "immagine": "https://images.stockx.com/images/Jordan-Cortez-#14-Product.jpg",
    "link": "https://stockx.com/jordan-cortez-#14"
  },
  {
    "modello": "yeezy zoom #15",
    "nome": "Yeezy Zoom #15",
    "sku": "YEZO00015",
    "prezzo": "238",
    "immagine": "https://images.stockx.com/images/Yeezy-Zoom-#15-Product.jpg",
    "link": "https://stockx.com/yeezy-zoom-#15"
  },
  {
    "modello": "jordan dunk #16",
    "nome": "Jordan Dunk #16",
    "sku": "JODU00016",
    "prezzo": "246",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-#16-Product.jpg",
    "link": "https://stockx.com/jordan-dunk-#16"
  },
  {
    "modello": "new balance suede #17",
    "nome": "New Balance Suede #17",
    "sku": "NESU00017",
    "prezzo": "271",
    "immagine": "https://images.stockx.com/images/New-Balance-Suede-#17-Product.jpg",
    "link": "https://stockx.com/new-balance-suede-#17"
  },
  {
    "modello": "jordan ultra boost #18",
    "nome": "Jordan Ultra Boost #18",
    "sku": "JOUL00018",
    "prezzo": "209",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra-Boost-#18-Product.jpg",
    "link": "https://stockx.com/jordan-ultra-boost-#18"
  },
  {
    "modello": "puma retro #19",
    "nome": "Puma Retro #19",
    "sku": "PURE00019",
    "prezzo": "340",
    "immagine": "https://images.stockx.com/images/Puma-Retro-#19-Product.jpg",
    "link": "https://stockx.com/puma-retro-#19"
  },
  {
    "modello": "jordan retro #20",
    "nome": "Jordan Retro #20",
    "sku": "JORE00020",
    "prezzo": "332",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-#20-Product.jpg",
    "link": "https://stockx.com/jordan-retro-#20"
  },
  {
    "modello": "yeezy ultra boost #21",
    "nome": "Yeezy Ultra Boost #21",
    "sku": "YEUL00021",
    "prezzo": "331",
    "immagine": "https://images.stockx.com/images/Yeezy-Ultra-Boost-#21-Product.jpg",
    "link": "https://stockx.com/yeezy-ultra-boost-#21"
  },
  {
    "modello": "asics air max #22",
    "nome": "Asics Air Max #22",
    "sku": "ASAI00022",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#22-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#22"
  },
  {
    "modello": "new balance gel-lyte #23",
    "nome": "New Balance Gel-Lyte #23",
    "sku": "NEGE00023",
    "prezzo": "90",
    "immagine": "https://images.stockx.com/images/New-Balance-Gel-Lyte-#23-Product.jpg",
    "link": "https://stockx.com/new-balance-gel-lyte-#23"
  },
  {
    "modello": "new balance zoom #24",
    "nome": "New Balance Zoom #24",
    "sku": "NEZO00024",
    "prezzo": "102",
    "immagine": "https://images.stockx.com/images/New-Balance-Zoom-#24-Product.jpg",
    "link": "https://stockx.com/new-balance-zoom-#24"
  },
  {
    "modello": "new balance classic #25",
    "nome": "New Balance Classic #25",
    "sku": "NECL00025",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/New-Balance-Classic-#25-Product.jpg",
    "link": "https://stockx.com/new-balance-classic-#25"
  },
  {
    "modello": "asics air max #26",
    "nome": "Asics Air Max #26",
    "sku": "ASAI00026",
    "prezzo": "204",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#26-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#26"
  },
  {
    "modello": "puma ultra boost #27",
    "nome": "Puma Ultra Boost #27",
    "sku": "PUUL00027",
    "prezzo": "279",
    "immagine": "https://images.stockx.com/images/Puma-Ultra-Boost-#27-Product.jpg",
    "link": "https://stockx.com/puma-ultra-boost-#27"
  },
  {
    "modello": "reebok rs-x #28",
    "nome": "Reebok RS-X #28",
    "sku": "RERS00028",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/Reebok-RS-X-#28-Product.jpg",
    "link": "https://stockx.com/reebok-rs-x-#28"
  },
  {
    "modello": "yeezy retro #29",
    "nome": "Yeezy Retro #29",
    "sku": "YERE00029",
    "prezzo": "212",
    "immagine": "https://images.stockx.com/images/Yeezy-Retro-#29-Product.jpg",
    "link": "https://stockx.com/yeezy-retro-#29"
  },
  {
    "modello": "asics gel-lyte #30",
    "nome": "Asics Gel-Lyte #30",
    "sku": "ASGE00030",
    "prezzo": "312",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-#30-Product.jpg",
    "link": "https://stockx.com/asics-gel-lyte-#30"
  },
  {
    "modello": "asics ultra boost #31",
    "nome": "Asics Ultra Boost #31",
    "sku": "ASUL00031",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Asics-Ultra-Boost-#31-Product.jpg",
    "link": "https://stockx.com/asics-ultra-boost-#31"
  },
  {
    "modello": "jordan dunk #32",
    "nome": "Jordan Dunk #32",
    "sku": "JODU00032",
    "prezzo": "329",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-#32-Product.jpg",
    "link": "https://stockx.com/jordan-dunk-#32"
  },
  {
    "modello": "nike gel-lyte #33",
    "nome": "Nike Gel-Lyte #33",
    "sku": "NIGE00033",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-#33-Product.jpg",
    "link": "https://stockx.com/nike-gel-lyte-#33"
  },
  {
    "modello": "converse retro #34",
    "nome": "Converse Retro #34",
    "sku": "CORE00034",
    "prezzo": "365",
    "immagine": "https://images.stockx.com/images/Converse-Retro-#34-Product.jpg",
    "link": "https://stockx.com/converse-retro-#34"
  },
  {
    "modello": "yeezy suede #35",
    "nome": "Yeezy Suede #35",
    "sku": "YESU00035",
    "prezzo": "273",
    "immagine": "https://images.stockx.com/images/Yeezy-Suede-#35-Product.jpg",
    "link": "https://stockx.com/yeezy-suede-#35"
  },
  {
    "modello": "nike classic #36",
    "nome": "Nike Classic #36",
    "sku": "NICL00036",
    "prezzo": "244",
    "immagine": "https://images.stockx.com/images/Nike-Classic-#36-Product.jpg",
    "link": "https://stockx.com/nike-classic-#36"
  },
  {
    "modello": "puma classic #37",
    "nome": "Puma Classic #37",
    "sku": "PUCL00037",
    "prezzo": "156",
    "immagine": "https://images.stockx.com/images/Puma-Classic-#37-Product.jpg",
    "link": "https://stockx.com/puma-classic-#37"
  },
  {
    "modello": "reebok ultra boost #38",
    "nome": "Reebok Ultra Boost #38",
    "sku": "REUL00038",
    "prezzo": "242",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra-Boost-#38-Product.jpg",
    "link": "https://stockx.com/reebok-ultra-boost-#38"
  },
  {
    "modello": "jordan zoom #39",
    "nome": "Jordan Zoom #39",
    "sku": "JOZO00039",
    "prezzo": "225",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#39-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#39"
  },
  {
    "modello": "adidas cortez #40",
    "nome": "Adidas Cortez #40",
    "sku": "ADCO00040",
    "prezzo": "249",
    "immagine": "https://images.stockx.com/images/Adidas-Cortez-#40-Product.jpg",
    "link": "https://stockx.com/adidas-cortez-#40"
  },
  {
    "modello": "asics cortez #41",
    "nome": "Asics Cortez #41",
    "sku": "ASCO00041",
    "prezzo": "290",
    "immagine": "https://images.stockx.com/images/Asics-Cortez-#41-Product.jpg",
    "link": "https://stockx.com/asics-cortez-#41"
  },
  {
    "modello": "puma air max #42",
    "nome": "Puma Air Max #42",
    "sku": "PUAI00042",
    "prezzo": "343",
    "immagine": "https://images.stockx.com/images/Puma-Air-Max-#42-Product.jpg",
    "link": "https://stockx.com/puma-air-max-#42"
  },
  {
    "modello": "converse dunk #43",
    "nome": "Converse Dunk #43",
    "sku": "CODU00043",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-#43-Product.jpg",
    "link": "https://stockx.com/converse-dunk-#43"
  },
  {
    "modello": "yeezy cortez #44",
    "nome": "Yeezy Cortez #44",
    "sku": "YECO00044",
    "prezzo": "122",
    "immagine": "https://images.stockx.com/images/Yeezy-Cortez-#44-Product.jpg",
    "link": "https://stockx.com/yeezy-cortez-#44"
  },
  {
    "modello": "puma gel-lyte #45",
    "nome": "Puma Gel-Lyte #45",
    "sku": "PUGE00045",
    "prezzo": "219",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-#45-Product.jpg",
    "link": "https://stockx.com/puma-gel-lyte-#45"
  },
  {
    "modello": "yeezy zoom #46",
    "nome": "Yeezy Zoom #46",
    "sku": "YEZO00046",
    "prezzo": "293",
    "immagine": "https://images.stockx.com/images/Yeezy-Zoom-#46-Product.jpg",
    "link": "https://stockx.com/yeezy-zoom-#46"
  },
  {
    "modello": "nike dunk #47",
    "nome": "Nike Dunk #47",
    "sku": "NIDU00047",
    "prezzo": "98",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-#47-Product.jpg",
    "link": "https://stockx.com/nike-dunk-#47"
  },
  {
    "modello": "puma air max #48",
    "nome": "Puma Air Max #48",
    "sku": "PUAI00048",
    "prezzo": "119",
    "immagine": "https://images.stockx.com/images/Puma-Air-Max-#48-Product.jpg",
    "link": "https://stockx.com/puma-air-max-#48"
  },
  {
    "modello": "converse classic #49",
    "nome": "Converse Classic #49",
    "sku": "COCL00049",
    "prezzo": "357",
    "immagine": "https://images.stockx.com/images/Converse-Classic-#49-Product.jpg",
    "link": "https://stockx.com/converse-classic-#49"
  },
  {
    "modello": "jordan zoom #50",
    "nome": "Jordan Zoom #50",
    "sku": "JOZO00050",
    "prezzo": "184",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#50-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#50"
  },
  {
    "modello": "converse classic #51",
    "nome": "Converse Classic #51",
    "sku": "COCL00051",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/Converse-Classic-#51-Product.jpg",
    "link": "https://stockx.com/converse-classic-#51"
  },
  {
    "modello": "converse classic #52",
    "nome": "Converse Classic #52",
    "sku": "COCL00052",
    "prezzo": "218",
    "immagine": "https://images.stockx.com/images/Converse-Classic-#52-Product.jpg",
    "link": "https://stockx.com/converse-classic-#52"
  },
  {
    "modello": "jordan gel-lyte #53",
    "nome": "Jordan Gel-Lyte #53",
    "sku": "JOGE00053",
    "prezzo": "201",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-#53-Product.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-#53"
  },
  {
    "modello": "adidas suede #54",
    "nome": "Adidas Suede #54",
    "sku": "ADSU00054",
    "prezzo": "153",
    "immagine": "https://images.stockx.com/images/Adidas-Suede-#54-Product.jpg",
    "link": "https://stockx.com/adidas-suede-#54"
  },
  {
    "modello": "adidas suede #55",
    "nome": "Adidas Suede #55",
    "sku": "ADSU00055",
    "prezzo": "392",
    "immagine": "https://images.stockx.com/images/Adidas-Suede-#55-Product.jpg",
    "link": "https://stockx.com/adidas-suede-#55"
  },
  {
    "modello": "adidas dunk #56",
    "nome": "Adidas Dunk #56",
    "sku": "ADDU00056",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-#56-Product.jpg",
    "link": "https://stockx.com/adidas-dunk-#56"
  },
  {
    "modello": "jordan cortez #57",
    "nome": "Jordan Cortez #57",
    "sku": "JOCO00057",
    "prezzo": "227",
    "immagine": "https://images.stockx.com/images/Jordan-Cortez-#57-Product.jpg",
    "link": "https://stockx.com/jordan-cortez-#57"
  },
  {
    "modello": "converse retro #58",
    "nome": "Converse Retro #58",
    "sku": "CORE00058",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Converse-Retro-#58-Product.jpg",
    "link": "https://stockx.com/converse-retro-#58"
  },
  {
    "modello": "adidas suede #59",
    "nome": "Adidas Suede #59",
    "sku": "ADSU00059",
    "prezzo": "236",
    "immagine": "https://images.stockx.com/images/Adidas-Suede-#59-Product.jpg",
    "link": "https://stockx.com/adidas-suede-#59"
  },
  {
    "modello": "adidas ultra boost #60",
    "nome": "Adidas Ultra Boost #60",
    "sku": "ADUL00060",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra-Boost-#60-Product.jpg",
    "link": "https://stockx.com/adidas-ultra-boost-#60"
  },
  {
    "modello": "puma dunk #61",
    "nome": "Puma Dunk #61",
    "sku": "PUDU00061",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-#61-Product.jpg",
    "link": "https://stockx.com/puma-dunk-#61"
  },
  {
    "modello": "reebok suede #62",
    "nome": "Reebok Suede #62",
    "sku": "RESU00062",
    "prezzo": "189",
    "immagine": "https://images.stockx.com/images/Reebok-Suede-#62-Product.jpg",
    "link": "https://stockx.com/reebok-suede-#62"
  },
  {
    "modello": "yeezy gel-lyte #63",
    "nome": "Yeezy Gel-Lyte #63",
    "sku": "YEGE00063",
    "prezzo": "371",
    "immagine": "https://images.stockx.com/images/Yeezy-Gel-Lyte-#63-Product.jpg",
    "link": "https://stockx.com/yeezy-gel-lyte-#63"
  },
  {
    "modello": "reebok dunk #64",
    "nome": "Reebok Dunk #64",
    "sku": "REDU00064",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-#64-Product.jpg",
    "link": "https://stockx.com/reebok-dunk-#64"
  },
  {
    "modello": "puma rs-x #65",
    "nome": "Puma RS-X #65",
    "sku": "PURS00065",
    "prezzo": "197",
    "immagine": "https://images.stockx.com/images/Puma-RS-X-#65-Product.jpg",
    "link": "https://stockx.com/puma-rs-x-#65"
  },
  {
    "modello": "nike retro #66",
    "nome": "Nike Retro #66",
    "sku": "NIRE00066",
    "prezzo": "221",
    "immagine": "https://images.stockx.com/images/Nike-Retro-#66-Product.jpg",
    "link": "https://stockx.com/nike-retro-#66"
  },
  {
    "modello": "puma ultra boost #67",
    "nome": "Puma Ultra Boost #67",
    "sku": "PUUL00067",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Puma-Ultra-Boost-#67-Product.jpg",
    "link": "https://stockx.com/puma-ultra-boost-#67"
  },
  {
    "modello": "new balance ultra boost #68",
    "nome": "New Balance Ultra Boost #68",
    "sku": "NEUL00068",
    "prezzo": "299",
    "immagine": "https://images.stockx.com/images/New-Balance-Ultra-Boost-#68-Product.jpg",
    "link": "https://stockx.com/new-balance-ultra-boost-#68"
  },
  {
    "modello": "asics cortez #69",
    "nome": "Asics Cortez #69",
    "sku": "ASCO00069",
    "prezzo": "226",
    "immagine": "https://images.stockx.com/images/Asics-Cortez-#69-Product.jpg",
    "link": "https://stockx.com/asics-cortez-#69"
  },
  {
    "modello": "adidas cortez #70",
    "nome": "Adidas Cortez #70",
    "sku": "ADCO00070",
    "prezzo": "294",
    "immagine": "https://images.stockx.com/images/Adidas-Cortez-#70-Product.jpg",
    "link": "https://stockx.com/adidas-cortez-#70"
  },
  {
    "modello": "puma suede #71",
    "nome": "Puma Suede #71",
    "sku": "PUSU00071",
    "prezzo": "108",
    "immagine": "https://images.stockx.com/images/Puma-Suede-#71-Product.jpg",
    "link": "https://stockx.com/puma-suede-#71"
  },
  {
    "modello": "puma air max #72",
    "nome": "Puma Air Max #72",
    "sku": "PUAI00072",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Puma-Air-Max-#72-Product.jpg",
    "link": "https://stockx.com/puma-air-max-#72"
  },
  {
    "modello": "reebok retro #73",
    "nome": "Reebok Retro #73",
    "sku": "RERE00073",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-#73-Product.jpg",
    "link": "https://stockx.com/reebok-retro-#73"
  },
  {
    "modello": "reebok gel-lyte #74",
    "nome": "Reebok Gel-Lyte #74",
    "sku": "REGE00074",
    "prezzo": "335",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-#74-Product.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-#74"
  },
  {
    "modello": "converse suede #75",
    "nome": "Converse Suede #75",
    "sku": "COSU00075",
    "prezzo": "307",
    "immagine": "https://images.stockx.com/images/Converse-Suede-#75-Product.jpg",
    "link": "https://stockx.com/converse-suede-#75"
  },
  {
    "modello": "nike air max #76",
    "nome": "Nike Air Max #76",
    "sku": "NIAI00076",
    "prezzo": "353",
    "immagine": "https://images.stockx.com/images/Nike-Air-Max-#76-Product.jpg",
    "link": "https://stockx.com/nike-air-max-#76"
  },
  {
    "modello": "jordan ultra boost #77",
    "nome": "Jordan Ultra Boost #77",
    "sku": "JOUL00077",
    "prezzo": "126",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra-Boost-#77-Product.jpg",
    "link": "https://stockx.com/jordan-ultra-boost-#77"
  },
  {
    "modello": "yeezy ultra boost #78",
    "nome": "Yeezy Ultra Boost #78",
    "sku": "YEUL00078",
    "prezzo": "349",
    "immagine": "https://images.stockx.com/images/Yeezy-Ultra-Boost-#78-Product.jpg",
    "link": "https://stockx.com/yeezy-ultra-boost-#78"
  },
  {
    "modello": "converse zoom #79",
    "nome": "Converse Zoom #79",
    "sku": "COZO00079",
    "prezzo": "351",
    "immagine": "https://images.stockx.com/images/Converse-Zoom-#79-Product.jpg",
    "link": "https://stockx.com/converse-zoom-#79"
  },
  {
    "modello": "asics classic #80",
    "nome": "Asics Classic #80",
    "sku": "ASCL00080",
    "prezzo": "161",
    "immagine": "https://images.stockx.com/images/Asics-Classic-#80-Product.jpg",
    "link": "https://stockx.com/asics-classic-#80"
  },
  {
    "modello": "puma ultra boost #81",
    "nome": "Puma Ultra Boost #81",
    "sku": "PUUL00081",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Puma-Ultra-Boost-#81-Product.jpg",
    "link": "https://stockx.com/puma-ultra-boost-#81"
  },
  {
    "modello": "asics ultra boost #82",
    "nome": "Asics Ultra Boost #82",
    "sku": "ASUL00082",
    "prezzo": "92",
    "immagine": "https://images.stockx.com/images/Asics-Ultra-Boost-#82-Product.jpg",
    "link": "https://stockx.com/asics-ultra-boost-#82"
  },
  {
    "modello": "yeezy ultra boost #83",
    "nome": "Yeezy Ultra Boost #83",
    "sku": "YEUL00083",
    "prezzo": "130",
    "immagine": "https://images.stockx.com/images/Yeezy-Ultra-Boost-#83-Product.jpg",
    "link": "https://stockx.com/yeezy-ultra-boost-#83"
  },
  {
    "modello": "yeezy classic #84",
    "nome": "Yeezy Classic #84",
    "sku": "YECL00084",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Yeezy-Classic-#84-Product.jpg",
    "link": "https://stockx.com/yeezy-classic-#84"
  },
  {
    "modello": "yeezy ultra boost #85",
    "nome": "Yeezy Ultra Boost #85",
    "sku": "YEUL00085",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Yeezy-Ultra-Boost-#85-Product.jpg",
    "link": "https://stockx.com/yeezy-ultra-boost-#85"
  },
  {
    "modello": "converse dunk #86",
    "nome": "Converse Dunk #86",
    "sku": "CODU00086",
    "prezzo": "220",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-#86-Product.jpg",
    "link": "https://stockx.com/converse-dunk-#86"
  },
  {
    "modello": "new balance zoom #87",
    "nome": "New Balance Zoom #87",
    "sku": "NEZO00087",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/New-Balance-Zoom-#87-Product.jpg",
    "link": "https://stockx.com/new-balance-zoom-#87"
  },
  {
    "modello": "asics zoom #88",
    "nome": "Asics Zoom #88",
    "sku": "ASZO00088",
    "prezzo": "355",
    "immagine": "https://images.stockx.com/images/Asics-Zoom-#88-Product.jpg",
    "link": "https://stockx.com/asics-zoom-#88"
  },
  {
    "modello": "adidas retro #89",
    "nome": "Adidas Retro #89",
    "sku": "ADRE00089",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-#89-Product.jpg",
    "link": "https://stockx.com/adidas-retro-#89"
  },
  {
    "modello": "puma dunk #90",
    "nome": "Puma Dunk #90",
    "sku": "PUDU00090",
    "prezzo": "102",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-#90-Product.jpg",
    "link": "https://stockx.com/puma-dunk-#90"
  },
  {
    "modello": "new balance suede #91",
    "nome": "New Balance Suede #91",
    "sku": "NESU00091",
    "prezzo": "110",
    "immagine": "https://images.stockx.com/images/New-Balance-Suede-#91-Product.jpg",
    "link": "https://stockx.com/new-balance-suede-#91"
  },
  {
    "modello": "jordan ultra boost #92",
    "nome": "Jordan Ultra Boost #92",
    "sku": "JOUL00092",
    "prezzo": "300",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra-Boost-#92-Product.jpg",
    "link": "https://stockx.com/jordan-ultra-boost-#92"
  },
  {
    "modello": "nike classic #93",
    "nome": "Nike Classic #93",
    "sku": "NICL00093",
    "prezzo": "132",
    "immagine": "https://images.stockx.com/images/Nike-Classic-#93-Product.jpg",
    "link": "https://stockx.com/nike-classic-#93"
  },
  {
    "modello": "nike air max #94",
    "nome": "Nike Air Max #94",
    "sku": "NIAI00094",
    "prezzo": "362",
    "immagine": "https://images.stockx.com/images/Nike-Air-Max-#94-Product.jpg",
    "link": "https://stockx.com/nike-air-max-#94"
  },
  {
    "modello": "nike retro #95",
    "nome": "Nike Retro #95",
    "sku": "NIRE00095",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/Nike-Retro-#95-Product.jpg",
    "link": "https://stockx.com/nike-retro-#95"
  },
  {
    "modello": "reebok classic #96",
    "nome": "Reebok Classic #96",
    "sku": "RECL00096",
    "prezzo": "142",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-#96-Product.jpg",
    "link": "https://stockx.com/reebok-classic-#96"
  },
  {
    "modello": "reebok ultra boost #97",
    "nome": "Reebok Ultra Boost #97",
    "sku": "REUL00097",
    "prezzo": "158",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra-Boost-#97-Product.jpg",
    "link": "https://stockx.com/reebok-ultra-boost-#97"
  },
  {
    "modello": "jordan retro #98",
    "nome": "Jordan Retro #98",
    "sku": "JORE00098",
    "prezzo": "393",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-#98-Product.jpg",
    "link": "https://stockx.com/jordan-retro-#98"
  },
  {
    "modello": "asics cortez #99",
    "nome": "Asics Cortez #99",
    "sku": "ASCO00099",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Asics-Cortez-#99-Product.jpg",
    "link": "https://stockx.com/asics-cortez-#99"
  },
  {
    "modello": "puma classic #100",
    "nome": "Puma Classic #100",
    "sku": "PUCL00100",
    "prezzo": "107",
    "immagine": "https://images.stockx.com/images/Puma-Classic-#100-Product.jpg",
    "link": "https://stockx.com/puma-classic-#100"
  },
  {
    "modello": "adidas dunk #101",
    "nome": "Adidas Dunk #101",
    "sku": "ADDU00101",
    "prezzo": "116",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-#101-Product.jpg",
    "link": "https://stockx.com/adidas-dunk-#101"
  },
  {
    "modello": "yeezy zoom #102",
    "nome": "Yeezy Zoom #102",
    "sku": "YEZO00102",
    "prezzo": "394",
    "immagine": "https://images.stockx.com/images/Yeezy-Zoom-#102-Product.jpg",
    "link": "https://stockx.com/yeezy-zoom-#102"
  },
  {
    "modello": "adidas classic #103",
    "nome": "Adidas Classic #103",
    "sku": "ADCL00103",
    "prezzo": "395",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-#103-Product.jpg",
    "link": "https://stockx.com/adidas-classic-#103"
  },
  {
    "modello": "new balance suede #104",
    "nome": "New Balance Suede #104",
    "sku": "NESU00104",
    "prezzo": "354",
    "immagine": "https://images.stockx.com/images/New-Balance-Suede-#104-Product.jpg",
    "link": "https://stockx.com/new-balance-suede-#104"
  },
  {
    "modello": "converse cortez #105",
    "nome": "Converse Cortez #105",
    "sku": "COCO00105",
    "prezzo": "200",
    "immagine": "https://images.stockx.com/images/Converse-Cortez-#105-Product.jpg",
    "link": "https://stockx.com/converse-cortez-#105"
  },
  {
    "modello": "converse rs-x #106",
    "nome": "Converse RS-X #106",
    "sku": "CORS00106",
    "prezzo": "220",
    "immagine": "https://images.stockx.com/images/Converse-RS-X-#106-Product.jpg",
    "link": "https://stockx.com/converse-rs-x-#106"
  },
  {
    "modello": "yeezy rs-x #107",
    "nome": "Yeezy RS-X #107",
    "sku": "YERS00107",
    "prezzo": "385",
    "immagine": "https://images.stockx.com/images/Yeezy-RS-X-#107-Product.jpg",
    "link": "https://stockx.com/yeezy-rs-x-#107"
  },
  {
    "modello": "nike retro #108",
    "nome": "Nike Retro #108",
    "sku": "NIRE00108",
    "prezzo": "223",
    "immagine": "https://images.stockx.com/images/Nike-Retro-#108-Product.jpg",
    "link": "https://stockx.com/nike-retro-#108"
  },
  {
    "modello": "adidas classic #109",
    "nome": "Adidas Classic #109",
    "sku": "ADCL00109",
    "prezzo": "132",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-#109-Product.jpg",
    "link": "https://stockx.com/adidas-classic-#109"
  },
  {
    "modello": "new balance air max #110",
    "nome": "New Balance Air Max #110",
    "sku": "NEAI00110",
    "prezzo": "302",
    "immagine": "https://images.stockx.com/images/New-Balance-Air-Max-#110-Product.jpg",
    "link": "https://stockx.com/new-balance-air-max-#110"
  },
  {
    "modello": "converse retro #111",
    "nome": "Converse Retro #111",
    "sku": "CORE00111",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/Converse-Retro-#111-Product.jpg",
    "link": "https://stockx.com/converse-retro-#111"
  },
  {
    "modello": "reebok gel-lyte #112",
    "nome": "Reebok Gel-Lyte #112",
    "sku": "REGE00112",
    "prezzo": "352",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-#112-Product.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-#112"
  },
  {
    "modello": "adidas suede #113",
    "nome": "Adidas Suede #113",
    "sku": "ADSU00113",
    "prezzo": "179",
    "immagine": "https://images.stockx.com/images/Adidas-Suede-#113-Product.jpg",
    "link": "https://stockx.com/adidas-suede-#113"
  },
  {
    "modello": "nike rs-x #114",
    "nome": "Nike RS-X #114",
    "sku": "NIRS00114",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#114-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#114"
  },
  {
    "modello": "new balance gel-lyte #115",
    "nome": "New Balance Gel-Lyte #115",
    "sku": "NEGE00115",
    "prezzo": "126",
    "immagine": "https://images.stockx.com/images/New-Balance-Gel-Lyte-#115-Product.jpg",
    "link": "https://stockx.com/new-balance-gel-lyte-#115"
  },
  {
    "modello": "asics gel-lyte #116",
    "nome": "Asics Gel-Lyte #116",
    "sku": "ASGE00116",
    "prezzo": "168",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-#116-Product.jpg",
    "link": "https://stockx.com/asics-gel-lyte-#116"
  },
  {
    "modello": "puma retro #117",
    "nome": "Puma Retro #117",
    "sku": "PURE00117",
    "prezzo": "323",
    "immagine": "https://images.stockx.com/images/Puma-Retro-#117-Product.jpg",
    "link": "https://stockx.com/puma-retro-#117"
  },
  {
    "modello": "puma retro #118",
    "nome": "Puma Retro #118",
    "sku": "PURE00118",
    "prezzo": "210",
    "immagine": "https://images.stockx.com/images/Puma-Retro-#118-Product.jpg",
    "link": "https://stockx.com/puma-retro-#118"
  },
  {
    "modello": "nike rs-x #119",
    "nome": "Nike RS-X #119",
    "sku": "NIRS00119",
    "prezzo": "242",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#119-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#119"
  },
  {
    "modello": "asics retro #120",
    "nome": "Asics Retro #120",
    "sku": "ASRE00120",
    "prezzo": "205",
    "immagine": "https://images.stockx.com/images/Asics-Retro-#120-Product.jpg",
    "link": "https://stockx.com/asics-retro-#120"
  },
  {
    "modello": "nike zoom #121",
    "nome": "Nike Zoom #121",
    "sku": "NIZO00121",
    "prezzo": "257",
    "immagine": "https://images.stockx.com/images/Nike-Zoom-#121-Product.jpg",
    "link": "https://stockx.com/nike-zoom-#121"
  },
  {
    "modello": "converse classic #122",
    "nome": "Converse Classic #122",
    "sku": "COCL00122",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Converse-Classic-#122-Product.jpg",
    "link": "https://stockx.com/converse-classic-#122"
  },
  {
    "modello": "new balance zoom #123",
    "nome": "New Balance Zoom #123",
    "sku": "NEZO00123",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/New-Balance-Zoom-#123-Product.jpg",
    "link": "https://stockx.com/new-balance-zoom-#123"
  },
  {
    "modello": "new balance zoom #124",
    "nome": "New Balance Zoom #124",
    "sku": "NEZO00124",
    "prezzo": "314",
    "immagine": "https://images.stockx.com/images/New-Balance-Zoom-#124-Product.jpg",
    "link": "https://stockx.com/new-balance-zoom-#124"
  },
  {
    "modello": "nike suede #125",
    "nome": "Nike Suede #125",
    "sku": "NISU00125",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Nike-Suede-#125-Product.jpg",
    "link": "https://stockx.com/nike-suede-#125"
  },
  {
    "modello": "asics dunk #126",
    "nome": "Asics Dunk #126",
    "sku": "ASDU00126",
    "prezzo": "174",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-#126-Product.jpg",
    "link": "https://stockx.com/asics-dunk-#126"
  },
  {
    "modello": "reebok ultra boost #127",
    "nome": "Reebok Ultra Boost #127",
    "sku": "REUL00127",
    "prezzo": "116",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra-Boost-#127-Product.jpg",
    "link": "https://stockx.com/reebok-ultra-boost-#127"
  },
  {
    "modello": "nike zoom #128",
    "nome": "Nike Zoom #128",
    "sku": "NIZO00128",
    "prezzo": "374",
    "immagine": "https://images.stockx.com/images/Nike-Zoom-#128-Product.jpg",
    "link": "https://stockx.com/nike-zoom-#128"
  },
  {
    "modello": "asics rs-x #129",
    "nome": "Asics RS-X #129",
    "sku": "ASRS00129",
    "prezzo": "171",
    "immagine": "https://images.stockx.com/images/Asics-RS-X-#129-Product.jpg",
    "link": "https://stockx.com/asics-rs-x-#129"
  },
  {
    "modello": "nike classic #130",
    "nome": "Nike Classic #130",
    "sku": "NICL00130",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Nike-Classic-#130-Product.jpg",
    "link": "https://stockx.com/nike-classic-#130"
  },
  {
    "modello": "converse zoom #131",
    "nome": "Converse Zoom #131",
    "sku": "COZO00131",
    "prezzo": "366",
    "immagine": "https://images.stockx.com/images/Converse-Zoom-#131-Product.jpg",
    "link": "https://stockx.com/converse-zoom-#131"
  },
  {
    "modello": "jordan dunk #132",
    "nome": "Jordan Dunk #132",
    "sku": "JODU00132",
    "prezzo": "159",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-#132-Product.jpg",
    "link": "https://stockx.com/jordan-dunk-#132"
  },
  {
    "modello": "puma retro #133",
    "nome": "Puma Retro #133",
    "sku": "PURE00133",
    "prezzo": "136",
    "immagine": "https://images.stockx.com/images/Puma-Retro-#133-Product.jpg",
    "link": "https://stockx.com/puma-retro-#133"
  },
  {
    "modello": "nike zoom #134",
    "nome": "Nike Zoom #134",
    "sku": "NIZO00134",
    "prezzo": "169",
    "immagine": "https://images.stockx.com/images/Nike-Zoom-#134-Product.jpg",
    "link": "https://stockx.com/nike-zoom-#134"
  },
  {
    "modello": "converse air max #135",
    "nome": "Converse Air Max #135",
    "sku": "COAI00135",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#135-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#135"
  },
  {
    "modello": "asics suede #136",
    "nome": "Asics Suede #136",
    "sku": "ASSU00136",
    "prezzo": "399",
    "immagine": "https://images.stockx.com/images/Asics-Suede-#136-Product.jpg",
    "link": "https://stockx.com/asics-suede-#136"
  },
  {
    "modello": "converse air max #137",
    "nome": "Converse Air Max #137",
    "sku": "COAI00137",
    "prezzo": "214",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#137-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#137"
  },
  {
    "modello": "nike zoom #138",
    "nome": "Nike Zoom #138",
    "sku": "NIZO00138",
    "prezzo": "255",
    "immagine": "https://images.stockx.com/images/Nike-Zoom-#138-Product.jpg",
    "link": "https://stockx.com/nike-zoom-#138"
  },
  {
    "modello": "asics air max #139",
    "nome": "Asics Air Max #139",
    "sku": "ASAI00139",
    "prezzo": "139",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#139-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#139"
  },
  {
    "modello": "nike cortez #140",
    "nome": "Nike Cortez #140",
    "sku": "NICO00140",
    "prezzo": "314",
    "immagine": "https://images.stockx.com/images/Nike-Cortez-#140-Product.jpg",
    "link": "https://stockx.com/nike-cortez-#140"
  },
  {
    "modello": "yeezy rs-x #141",
    "nome": "Yeezy RS-X #141",
    "sku": "YERS00141",
    "prezzo": "356",
    "immagine": "https://images.stockx.com/images/Yeezy-RS-X-#141-Product.jpg",
    "link": "https://stockx.com/yeezy-rs-x-#141"
  },
  {
    "modello": "adidas classic #142",
    "nome": "Adidas Classic #142",
    "sku": "ADCL00142",
    "prezzo": "338",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-#142-Product.jpg",
    "link": "https://stockx.com/adidas-classic-#142"
  },
  {
    "modello": "puma retro #143",
    "nome": "Puma Retro #143",
    "sku": "PURE00143",
    "prezzo": "97",
    "immagine": "https://images.stockx.com/images/Puma-Retro-#143-Product.jpg",
    "link": "https://stockx.com/puma-retro-#143"
  },
  {
    "modello": "nike rs-x #144",
    "nome": "Nike RS-X #144",
    "sku": "NIRS00144",
    "prezzo": "182",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#144-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#144"
  },
  {
    "modello": "yeezy cortez #145",
    "nome": "Yeezy Cortez #145",
    "sku": "YECO00145",
    "prezzo": "169",
    "immagine": "https://images.stockx.com/images/Yeezy-Cortez-#145-Product.jpg",
    "link": "https://stockx.com/yeezy-cortez-#145"
  },
  {
    "modello": "converse ultra boost #146",
    "nome": "Converse Ultra Boost #146",
    "sku": "COUL00146",
    "prezzo": "186",
    "immagine": "https://images.stockx.com/images/Converse-Ultra-Boost-#146-Product.jpg",
    "link": "https://stockx.com/converse-ultra-boost-#146"
  },
  {
    "modello": "yeezy suede #147",
    "nome": "Yeezy Suede #147",
    "sku": "YESU00147",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Yeezy-Suede-#147-Product.jpg",
    "link": "https://stockx.com/yeezy-suede-#147"
  },
  {
    "modello": "nike cortez #148",
    "nome": "Nike Cortez #148",
    "sku": "NICO00148",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Nike-Cortez-#148-Product.jpg",
    "link": "https://stockx.com/nike-cortez-#148"
  },
  {
    "modello": "asics air max #149",
    "nome": "Asics Air Max #149",
    "sku": "ASAI00149",
    "prezzo": "139",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#149-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#149"
  },
  {
    "modello": "adidas zoom #150",
    "nome": "Adidas Zoom #150",
    "sku": "ADZO00150",
    "prezzo": "297",
    "immagine": "https://images.stockx.com/images/Adidas-Zoom-#150-Product.jpg",
    "link": "https://stockx.com/adidas-zoom-#150"
  },
  {
    "modello": "new balance gel-lyte #151",
    "nome": "New Balance Gel-Lyte #151",
    "sku": "NEGE00151",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/New-Balance-Gel-Lyte-#151-Product.jpg",
    "link": "https://stockx.com/new-balance-gel-lyte-#151"
  },
  {
    "modello": "nike ultra boost #152",
    "nome": "Nike Ultra Boost #152",
    "sku": "NIUL00152",
    "prezzo": "308",
    "immagine": "https://images.stockx.com/images/Nike-Ultra-Boost-#152-Product.jpg",
    "link": "https://stockx.com/nike-ultra-boost-#152"
  },
  {
    "modello": "nike suede #153",
    "nome": "Nike Suede #153",
    "sku": "NISU00153",
    "prezzo": "200",
    "immagine": "https://images.stockx.com/images/Nike-Suede-#153-Product.jpg",
    "link": "https://stockx.com/nike-suede-#153"
  },
  {
    "modello": "asics classic #154",
    "nome": "Asics Classic #154",
    "sku": "ASCL00154",
    "prezzo": "152",
    "immagine": "https://images.stockx.com/images/Asics-Classic-#154-Product.jpg",
    "link": "https://stockx.com/asics-classic-#154"
  },
  {
    "modello": "yeezy ultra boost #155",
    "nome": "Yeezy Ultra Boost #155",
    "sku": "YEUL00155",
    "prezzo": "186",
    "immagine": "https://images.stockx.com/images/Yeezy-Ultra-Boost-#155-Product.jpg",
    "link": "https://stockx.com/yeezy-ultra-boost-#155"
  },
  {
    "modello": "asics rs-x #156",
    "nome": "Asics RS-X #156",
    "sku": "ASRS00156",
    "prezzo": "120",
    "immagine": "https://images.stockx.com/images/Asics-RS-X-#156-Product.jpg",
    "link": "https://stockx.com/asics-rs-x-#156"
  },
  {
    "modello": "asics dunk #157",
    "nome": "Asics Dunk #157",
    "sku": "ASDU00157",
    "prezzo": "206",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-#157-Product.jpg",
    "link": "https://stockx.com/asics-dunk-#157"
  },
  {
    "modello": "new balance cortez #158",
    "nome": "New Balance Cortez #158",
    "sku": "NECO00158",
    "prezzo": "176",
    "immagine": "https://images.stockx.com/images/New-Balance-Cortez-#158-Product.jpg",
    "link": "https://stockx.com/new-balance-cortez-#158"
  },
  {
    "modello": "new balance rs-x #159",
    "nome": "New Balance RS-X #159",
    "sku": "NERS00159",
    "prezzo": "212",
    "immagine": "https://images.stockx.com/images/New-Balance-RS-X-#159-Product.jpg",
    "link": "https://stockx.com/new-balance-rs-x-#159"
  },
  {
    "modello": "nike ultra boost #160",
    "nome": "Nike Ultra Boost #160",
    "sku": "NIUL00160",
    "prezzo": "349",
    "immagine": "https://images.stockx.com/images/Nike-Ultra-Boost-#160-Product.jpg",
    "link": "https://stockx.com/nike-ultra-boost-#160"
  },
  {
    "modello": "yeezy cortez #161",
    "nome": "Yeezy Cortez #161",
    "sku": "YECO00161",
    "prezzo": "257",
    "immagine": "https://images.stockx.com/images/Yeezy-Cortez-#161-Product.jpg",
    "link": "https://stockx.com/yeezy-cortez-#161"
  },
  {
    "modello": "nike gel-lyte #162",
    "nome": "Nike Gel-Lyte #162",
    "sku": "NIGE00162",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-#162-Product.jpg",
    "link": "https://stockx.com/nike-gel-lyte-#162"
  },
  {
    "modello": "puma zoom #163",
    "nome": "Puma Zoom #163",
    "sku": "PUZO00163",
    "prezzo": "228",
    "immagine": "https://images.stockx.com/images/Puma-Zoom-#163-Product.jpg",
    "link": "https://stockx.com/puma-zoom-#163"
  },
  {
    "modello": "new balance ultra boost #164",
    "nome": "New Balance Ultra Boost #164",
    "sku": "NEUL00164",
    "prezzo": "394",
    "immagine": "https://images.stockx.com/images/New-Balance-Ultra-Boost-#164-Product.jpg",
    "link": "https://stockx.com/new-balance-ultra-boost-#164"
  },
  {
    "modello": "converse zoom #165",
    "nome": "Converse Zoom #165",
    "sku": "COZO00165",
    "prezzo": "144",
    "immagine": "https://images.stockx.com/images/Converse-Zoom-#165-Product.jpg",
    "link": "https://stockx.com/converse-zoom-#165"
  },
  {
    "modello": "new balance dunk #166",
    "nome": "New Balance Dunk #166",
    "sku": "NEDU00166",
    "prezzo": "107",
    "immagine": "https://images.stockx.com/images/New-Balance-Dunk-#166-Product.jpg",
    "link": "https://stockx.com/new-balance-dunk-#166"
  },
  {
    "modello": "reebok rs-x #167",
    "nome": "Reebok RS-X #167",
    "sku": "RERS00167",
    "prezzo": "303",
    "immagine": "https://images.stockx.com/images/Reebok-RS-X-#167-Product.jpg",
    "link": "https://stockx.com/reebok-rs-x-#167"
  },
  {
    "modello": "asics suede #168",
    "nome": "Asics Suede #168",
    "sku": "ASSU00168",
    "prezzo": "124",
    "immagine": "https://images.stockx.com/images/Asics-Suede-#168-Product.jpg",
    "link": "https://stockx.com/asics-suede-#168"
  },
  {
    "modello": "reebok suede #169",
    "nome": "Reebok Suede #169",
    "sku": "RESU00169",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Reebok-Suede-#169-Product.jpg",
    "link": "https://stockx.com/reebok-suede-#169"
  },
  {
    "modello": "converse air max #170",
    "nome": "Converse Air Max #170",
    "sku": "COAI00170",
    "prezzo": "328",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#170-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#170"
  },
  {
    "modello": "jordan zoom #171",
    "nome": "Jordan Zoom #171",
    "sku": "JOZO00171",
    "prezzo": "95",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#171-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#171"
  },
  {
    "modello": "nike rs-x #172",
    "nome": "Nike RS-X #172",
    "sku": "NIRS00172",
    "prezzo": "99",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#172-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#172"
  },
  {
    "modello": "adidas retro #173",
    "nome": "Adidas Retro #173",
    "sku": "ADRE00173",
    "prezzo": "112",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-#173-Product.jpg",
    "link": "https://stockx.com/adidas-retro-#173"
  },
  {
    "modello": "jordan classic #174",
    "nome": "Jordan Classic #174",
    "sku": "JOCL00174",
    "prezzo": "185",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-#174-Product.jpg",
    "link": "https://stockx.com/jordan-classic-#174"
  },
  {
    "modello": "converse rs-x #175",
    "nome": "Converse RS-X #175",
    "sku": "CORS00175",
    "prezzo": "261",
    "immagine": "https://images.stockx.com/images/Converse-RS-X-#175-Product.jpg",
    "link": "https://stockx.com/converse-rs-x-#175"
  },
  {
    "modello": "jordan zoom #176",
    "nome": "Jordan Zoom #176",
    "sku": "JOZO00176",
    "prezzo": "316",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#176-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#176"
  },
  {
    "modello": "new balance retro #177",
    "nome": "New Balance Retro #177",
    "sku": "NERE00177",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/New-Balance-Retro-#177-Product.jpg",
    "link": "https://stockx.com/new-balance-retro-#177"
  },
  {
    "modello": "asics air max #178",
    "nome": "Asics Air Max #178",
    "sku": "ASAI00178",
    "prezzo": "314",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#178-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#178"
  },
  {
    "modello": "converse air max #179",
    "nome": "Converse Air Max #179",
    "sku": "COAI00179",
    "prezzo": "394",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#179-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#179"
  },
  {
    "modello": "adidas dunk #180",
    "nome": "Adidas Dunk #180",
    "sku": "ADDU00180",
    "prezzo": "244",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-#180-Product.jpg",
    "link": "https://stockx.com/adidas-dunk-#180"
  },
  {
    "modello": "asics gel-lyte #181",
    "nome": "Asics Gel-Lyte #181",
    "sku": "ASGE00181",
    "prezzo": "383",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-#181-Product.jpg",
    "link": "https://stockx.com/asics-gel-lyte-#181"
  },
  {
    "modello": "reebok dunk #182",
    "nome": "Reebok Dunk #182",
    "sku": "REDU00182",
    "prezzo": "143",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-#182-Product.jpg",
    "link": "https://stockx.com/reebok-dunk-#182"
  },
  {
    "modello": "new balance gel-lyte #183",
    "nome": "New Balance Gel-Lyte #183",
    "sku": "NEGE00183",
    "prezzo": "380",
    "immagine": "https://images.stockx.com/images/New-Balance-Gel-Lyte-#183-Product.jpg",
    "link": "https://stockx.com/new-balance-gel-lyte-#183"
  },
  {
    "modello": "converse cortez #184",
    "nome": "Converse Cortez #184",
    "sku": "COCO00184",
    "prezzo": "146",
    "immagine": "https://images.stockx.com/images/Converse-Cortez-#184-Product.jpg",
    "link": "https://stockx.com/converse-cortez-#184"
  },
  {
    "modello": "converse retro #185",
    "nome": "Converse Retro #185",
    "sku": "CORE00185",
    "prezzo": "275",
    "immagine": "https://images.stockx.com/images/Converse-Retro-#185-Product.jpg",
    "link": "https://stockx.com/converse-retro-#185"
  },
  {
    "modello": "adidas rs-x #186",
    "nome": "Adidas RS-X #186",
    "sku": "ADRS00186",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Adidas-RS-X-#186-Product.jpg",
    "link": "https://stockx.com/adidas-rs-x-#186"
  },
  {
    "modello": "yeezy suede #187",
    "nome": "Yeezy Suede #187",
    "sku": "YESU00187",
    "prezzo": "134",
    "immagine": "https://images.stockx.com/images/Yeezy-Suede-#187-Product.jpg",
    "link": "https://stockx.com/yeezy-suede-#187"
  },
  {
    "modello": "adidas retro #188",
    "nome": "Adidas Retro #188",
    "sku": "ADRE00188",
    "prezzo": "263",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-#188-Product.jpg",
    "link": "https://stockx.com/adidas-retro-#188"
  },
  {
    "modello": "yeezy air max #189",
    "nome": "Yeezy Air Max #189",
    "sku": "YEAI00189",
    "prezzo": "279",
    "immagine": "https://images.stockx.com/images/Yeezy-Air-Max-#189-Product.jpg",
    "link": "https://stockx.com/yeezy-air-max-#189"
  },
  {
    "modello": "asics air max #190",
    "nome": "Asics Air Max #190",
    "sku": "ASAI00190",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#190-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#190"
  },
  {
    "modello": "new balance zoom #191",
    "nome": "New Balance Zoom #191",
    "sku": "NEZO00191",
    "prezzo": "175",
    "immagine": "https://images.stockx.com/images/New-Balance-Zoom-#191-Product.jpg",
    "link": "https://stockx.com/new-balance-zoom-#191"
  },
  {
    "modello": "jordan cortez #192",
    "nome": "Jordan Cortez #192",
    "sku": "JOCO00192",
    "prezzo": "372",
    "immagine": "https://images.stockx.com/images/Jordan-Cortez-#192-Product.jpg",
    "link": "https://stockx.com/jordan-cortez-#192"
  },
  {
    "modello": "jordan suede #193",
    "nome": "Jordan Suede #193",
    "sku": "JOSU00193",
    "prezzo": "322",
    "immagine": "https://images.stockx.com/images/Jordan-Suede-#193-Product.jpg",
    "link": "https://stockx.com/jordan-suede-#193"
  },
  {
    "modello": "puma zoom #194",
    "nome": "Puma Zoom #194",
    "sku": "PUZO00194",
    "prezzo": "196",
    "immagine": "https://images.stockx.com/images/Puma-Zoom-#194-Product.jpg",
    "link": "https://stockx.com/puma-zoom-#194"
  },
  {
    "modello": "yeezy cortez #195",
    "nome": "Yeezy Cortez #195",
    "sku": "YECO00195",
    "prezzo": "115",
    "immagine": "https://images.stockx.com/images/Yeezy-Cortez-#195-Product.jpg",
    "link": "https://stockx.com/yeezy-cortez-#195"
  },
  {
    "modello": "adidas classic #196",
    "nome": "Adidas Classic #196",
    "sku": "ADCL00196",
    "prezzo": "160",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-#196-Product.jpg",
    "link": "https://stockx.com/adidas-classic-#196"
  },
  {
    "modello": "asics rs-x #197",
    "nome": "Asics RS-X #197",
    "sku": "ASRS00197",
    "prezzo": "272",
    "immagine": "https://images.stockx.com/images/Asics-RS-X-#197-Product.jpg",
    "link": "https://stockx.com/asics-rs-x-#197"
  },
  {
    "modello": "reebok classic #198",
    "nome": "Reebok Classic #198",
    "sku": "RECL00198",
    "prezzo": "270",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-#198-Product.jpg",
    "link": "https://stockx.com/reebok-classic-#198"
  },
  {
    "modello": "reebok suede #199",
    "nome": "Reebok Suede #199",
    "sku": "RESU00199",
    "prezzo": "181",
    "immagine": "https://images.stockx.com/images/Reebok-Suede-#199-Product.jpg",
    "link": "https://stockx.com/reebok-suede-#199"
  },
  {
    "modello": "puma ultra boost #200",
    "nome": "Puma Ultra Boost #200",
    "sku": "PUUL00200",
    "prezzo": "204",
    "immagine": "https://images.stockx.com/images/Puma-Ultra-Boost-#200-Product.jpg",
    "link": "https://stockx.com/puma-ultra-boost-#200"
  },
  {
    "modello": "adidas air max #201",
    "nome": "Adidas Air Max #201",
    "sku": "ADAI00201",
    "prezzo": "292",
    "immagine": "https://images.stockx.com/images/Adidas-Air-Max-#201-Product.jpg",
    "link": "https://stockx.com/adidas-air-max-#201"
  },
  {
    "modello": "asics zoom #202",
    "nome": "Asics Zoom #202",
    "sku": "ASZO00202",
    "prezzo": "356",
    "immagine": "https://images.stockx.com/images/Asics-Zoom-#202-Product.jpg",
    "link": "https://stockx.com/asics-zoom-#202"
  },
  {
    "modello": "converse dunk #203",
    "nome": "Converse Dunk #203",
    "sku": "CODU00203",
    "prezzo": "353",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-#203-Product.jpg",
    "link": "https://stockx.com/converse-dunk-#203"
  },
  {
    "modello": "converse classic #204",
    "nome": "Converse Classic #204",
    "sku": "COCL00204",
    "prezzo": "389",
    "immagine": "https://images.stockx.com/images/Converse-Classic-#204-Product.jpg",
    "link": "https://stockx.com/converse-classic-#204"
  },
  {
    "modello": "jordan rs-x #205",
    "nome": "Jordan RS-X #205",
    "sku": "JORS00205",
    "prezzo": "196",
    "immagine": "https://images.stockx.com/images/Jordan-RS-X-#205-Product.jpg",
    "link": "https://stockx.com/jordan-rs-x-#205"
  },
  {
    "modello": "asics air max #206",
    "nome": "Asics Air Max #206",
    "sku": "ASAI00206",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#206-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#206"
  },
  {
    "modello": "asics zoom #207",
    "nome": "Asics Zoom #207",
    "sku": "ASZO00207",
    "prezzo": "175",
    "immagine": "https://images.stockx.com/images/Asics-Zoom-#207-Product.jpg",
    "link": "https://stockx.com/asics-zoom-#207"
  },
  {
    "modello": "jordan suede #208",
    "nome": "Jordan Suede #208",
    "sku": "JOSU00208",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Jordan-Suede-#208-Product.jpg",
    "link": "https://stockx.com/jordan-suede-#208"
  },
  {
    "modello": "yeezy zoom #209",
    "nome": "Yeezy Zoom #209",
    "sku": "YEZO00209",
    "prezzo": "279",
    "immagine": "https://images.stockx.com/images/Yeezy-Zoom-#209-Product.jpg",
    "link": "https://stockx.com/yeezy-zoom-#209"
  },
  {
    "modello": "adidas air max #210",
    "nome": "Adidas Air Max #210",
    "sku": "ADAI00210",
    "prezzo": "374",
    "immagine": "https://images.stockx.com/images/Adidas-Air-Max-#210-Product.jpg",
    "link": "https://stockx.com/adidas-air-max-#210"
  },
  {
    "modello": "yeezy retro #211",
    "nome": "Yeezy Retro #211",
    "sku": "YERE00211",
    "prezzo": "260",
    "immagine": "https://images.stockx.com/images/Yeezy-Retro-#211-Product.jpg",
    "link": "https://stockx.com/yeezy-retro-#211"
  },
  {
    "modello": "converse air max #212",
    "nome": "Converse Air Max #212",
    "sku": "COAI00212",
    "prezzo": "240",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#212-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#212"
  },
  {
    "modello": "nike gel-lyte #213",
    "nome": "Nike Gel-Lyte #213",
    "sku": "NIGE00213",
    "prezzo": "119",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-#213-Product.jpg",
    "link": "https://stockx.com/nike-gel-lyte-#213"
  },
  {
    "modello": "puma zoom #214",
    "nome": "Puma Zoom #214",
    "sku": "PUZO00214",
    "prezzo": "244",
    "immagine": "https://images.stockx.com/images/Puma-Zoom-#214-Product.jpg",
    "link": "https://stockx.com/puma-zoom-#214"
  },
  {
    "modello": "yeezy retro #215",
    "nome": "Yeezy Retro #215",
    "sku": "YERE00215",
    "prezzo": "275",
    "immagine": "https://images.stockx.com/images/Yeezy-Retro-#215-Product.jpg",
    "link": "https://stockx.com/yeezy-retro-#215"
  },
  {
    "modello": "new balance gel-lyte #216",
    "nome": "New Balance Gel-Lyte #216",
    "sku": "NEGE00216",
    "prezzo": "236",
    "immagine": "https://images.stockx.com/images/New-Balance-Gel-Lyte-#216-Product.jpg",
    "link": "https://stockx.com/new-balance-gel-lyte-#216"
  },
  {
    "modello": "adidas classic #217",
    "nome": "Adidas Classic #217",
    "sku": "ADCL00217",
    "prezzo": "191",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-#217-Product.jpg",
    "link": "https://stockx.com/adidas-classic-#217"
  },
  {
    "modello": "jordan dunk #218",
    "nome": "Jordan Dunk #218",
    "sku": "JODU00218",
    "prezzo": "319",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-#218-Product.jpg",
    "link": "https://stockx.com/jordan-dunk-#218"
  },
  {
    "modello": "nike rs-x #219",
    "nome": "Nike RS-X #219",
    "sku": "NIRS00219",
    "prezzo": "318",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#219-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#219"
  },
  {
    "modello": "converse dunk #220",
    "nome": "Converse Dunk #220",
    "sku": "CODU00220",
    "prezzo": "293",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-#220-Product.jpg",
    "link": "https://stockx.com/converse-dunk-#220"
  },
  {
    "modello": "asics rs-x #221",
    "nome": "Asics RS-X #221",
    "sku": "ASRS00221",
    "prezzo": "97",
    "immagine": "https://images.stockx.com/images/Asics-RS-X-#221-Product.jpg",
    "link": "https://stockx.com/asics-rs-x-#221"
  },
  {
    "modello": "nike rs-x #222",
    "nome": "Nike RS-X #222",
    "sku": "NIRS00222",
    "prezzo": "249",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#222-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#222"
  },
  {
    "modello": "nike gel-lyte #223",
    "nome": "Nike Gel-Lyte #223",
    "sku": "NIGE00223",
    "prezzo": "171",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-#223-Product.jpg",
    "link": "https://stockx.com/nike-gel-lyte-#223"
  },
  {
    "modello": "new balance retro #224",
    "nome": "New Balance Retro #224",
    "sku": "NERE00224",
    "prezzo": "357",
    "immagine": "https://images.stockx.com/images/New-Balance-Retro-#224-Product.jpg",
    "link": "https://stockx.com/new-balance-retro-#224"
  },
  {
    "modello": "puma cortez #225",
    "nome": "Puma Cortez #225",
    "sku": "PUCO00225",
    "prezzo": "196",
    "immagine": "https://images.stockx.com/images/Puma-Cortez-#225-Product.jpg",
    "link": "https://stockx.com/puma-cortez-#225"
  },
  {
    "modello": "new balance air max #226",
    "nome": "New Balance Air Max #226",
    "sku": "NEAI00226",
    "prezzo": "293",
    "immagine": "https://images.stockx.com/images/New-Balance-Air-Max-#226-Product.jpg",
    "link": "https://stockx.com/new-balance-air-max-#226"
  },
  {
    "modello": "reebok dunk #227",
    "nome": "Reebok Dunk #227",
    "sku": "REDU00227",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-#227-Product.jpg",
    "link": "https://stockx.com/reebok-dunk-#227"
  },
  {
    "modello": "converse ultra boost #228",
    "nome": "Converse Ultra Boost #228",
    "sku": "COUL00228",
    "prezzo": "302",
    "immagine": "https://images.stockx.com/images/Converse-Ultra-Boost-#228-Product.jpg",
    "link": "https://stockx.com/converse-ultra-boost-#228"
  },
  {
    "modello": "yeezy retro #229",
    "nome": "Yeezy Retro #229",
    "sku": "YERE00229",
    "prezzo": "213",
    "immagine": "https://images.stockx.com/images/Yeezy-Retro-#229-Product.jpg",
    "link": "https://stockx.com/yeezy-retro-#229"
  },
  {
    "modello": "jordan gel-lyte #230",
    "nome": "Jordan Gel-Lyte #230",
    "sku": "JOGE00230",
    "prezzo": "251",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-#230-Product.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-#230"
  },
  {
    "modello": "jordan zoom #231",
    "nome": "Jordan Zoom #231",
    "sku": "JOZO00231",
    "prezzo": "124",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#231-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#231"
  },
  {
    "modello": "puma zoom #232",
    "nome": "Puma Zoom #232",
    "sku": "PUZO00232",
    "prezzo": "226",
    "immagine": "https://images.stockx.com/images/Puma-Zoom-#232-Product.jpg",
    "link": "https://stockx.com/puma-zoom-#232"
  },
  {
    "modello": "jordan gel-lyte #233",
    "nome": "Jordan Gel-Lyte #233",
    "sku": "JOGE00233",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-#233-Product.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-#233"
  },
  {
    "modello": "nike suede #234",
    "nome": "Nike Suede #234",
    "sku": "NISU00234",
    "prezzo": "351",
    "immagine": "https://images.stockx.com/images/Nike-Suede-#234-Product.jpg",
    "link": "https://stockx.com/nike-suede-#234"
  },
  {
    "modello": "converse rs-x #235",
    "nome": "Converse RS-X #235",
    "sku": "CORS00235",
    "prezzo": "263",
    "immagine": "https://images.stockx.com/images/Converse-RS-X-#235-Product.jpg",
    "link": "https://stockx.com/converse-rs-x-#235"
  },
  {
    "modello": "asics air max #236",
    "nome": "Asics Air Max #236",
    "sku": "ASAI00236",
    "prezzo": "394",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#236-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#236"
  },
  {
    "modello": "new balance classic #237",
    "nome": "New Balance Classic #237",
    "sku": "NECL00237",
    "prezzo": "161",
    "immagine": "https://images.stockx.com/images/New-Balance-Classic-#237-Product.jpg",
    "link": "https://stockx.com/new-balance-classic-#237"
  },
  {
    "modello": "asics ultra boost #238",
    "nome": "Asics Ultra Boost #238",
    "sku": "ASUL00238",
    "prezzo": "283",
    "immagine": "https://images.stockx.com/images/Asics-Ultra-Boost-#238-Product.jpg",
    "link": "https://stockx.com/asics-ultra-boost-#238"
  },
  {
    "modello": "jordan cortez #239",
    "nome": "Jordan Cortez #239",
    "sku": "JOCO00239",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Jordan-Cortez-#239-Product.jpg",
    "link": "https://stockx.com/jordan-cortez-#239"
  },
  {
    "modello": "jordan rs-x #240",
    "nome": "Jordan RS-X #240",
    "sku": "JORS00240",
    "prezzo": "290",
    "immagine": "https://images.stockx.com/images/Jordan-RS-X-#240-Product.jpg",
    "link": "https://stockx.com/jordan-rs-x-#240"
  },
  {
    "modello": "adidas ultra boost #241",
    "nome": "Adidas Ultra Boost #241",
    "sku": "ADUL00241",
    "prezzo": "144",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra-Boost-#241-Product.jpg",
    "link": "https://stockx.com/adidas-ultra-boost-#241"
  },
  {
    "modello": "new balance air max #242",
    "nome": "New Balance Air Max #242",
    "sku": "NEAI00242",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/New-Balance-Air-Max-#242-Product.jpg",
    "link": "https://stockx.com/new-balance-air-max-#242"
  },
  {
    "modello": "puma gel-lyte #243",
    "nome": "Puma Gel-Lyte #243",
    "sku": "PUGE00243",
    "prezzo": "126",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-#243-Product.jpg",
    "link": "https://stockx.com/puma-gel-lyte-#243"
  },
  {
    "modello": "yeezy dunk #244",
    "nome": "Yeezy Dunk #244",
    "sku": "YEDU00244",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Yeezy-Dunk-#244-Product.jpg",
    "link": "https://stockx.com/yeezy-dunk-#244"
  },
  {
    "modello": "converse suede #245",
    "nome": "Converse Suede #245",
    "sku": "COSU00245",
    "prezzo": "328",
    "immagine": "https://images.stockx.com/images/Converse-Suede-#245-Product.jpg",
    "link": "https://stockx.com/converse-suede-#245"
  },
  {
    "modello": "puma retro #246",
    "nome": "Puma Retro #246",
    "sku": "PURE00246",
    "prezzo": "252",
    "immagine": "https://images.stockx.com/images/Puma-Retro-#246-Product.jpg",
    "link": "https://stockx.com/puma-retro-#246"
  },
  {
    "modello": "puma ultra boost #247",
    "nome": "Puma Ultra Boost #247",
    "sku": "PUUL00247",
    "prezzo": "204",
    "immagine": "https://images.stockx.com/images/Puma-Ultra-Boost-#247-Product.jpg",
    "link": "https://stockx.com/puma-ultra-boost-#247"
  },
  {
    "modello": "reebok classic #248",
    "nome": "Reebok Classic #248",
    "sku": "RECL00248",
    "prezzo": "288",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-#248-Product.jpg",
    "link": "https://stockx.com/reebok-classic-#248"
  },
  {
    "modello": "adidas zoom #249",
    "nome": "Adidas Zoom #249",
    "sku": "ADZO00249",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Adidas-Zoom-#249-Product.jpg",
    "link": "https://stockx.com/adidas-zoom-#249"
  },
  {
    "modello": "nike retro #250",
    "nome": "Nike Retro #250",
    "sku": "NIRE00250",
    "prezzo": "244",
    "immagine": "https://images.stockx.com/images/Nike-Retro-#250-Product.jpg",
    "link": "https://stockx.com/nike-retro-#250"
  },
  {
    "modello": "nike retro #251",
    "nome": "Nike Retro #251",
    "sku": "NIRE00251",
    "prezzo": "139",
    "immagine": "https://images.stockx.com/images/Nike-Retro-#251-Product.jpg",
    "link": "https://stockx.com/nike-retro-#251"
  },
  {
    "modello": "reebok dunk #252",
    "nome": "Reebok Dunk #252",
    "sku": "REDU00252",
    "prezzo": "190",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-#252-Product.jpg",
    "link": "https://stockx.com/reebok-dunk-#252"
  },
  {
    "modello": "adidas cortez #253",
    "nome": "Adidas Cortez #253",
    "sku": "ADCO00253",
    "prezzo": "255",
    "immagine": "https://images.stockx.com/images/Adidas-Cortez-#253-Product.jpg",
    "link": "https://stockx.com/adidas-cortez-#253"
  },
  {
    "modello": "asics air max #254",
    "nome": "Asics Air Max #254",
    "sku": "ASAI00254",
    "prezzo": "393",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#254-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#254"
  },
  {
    "modello": "puma retro #255",
    "nome": "Puma Retro #255",
    "sku": "PURE00255",
    "prezzo": "278",
    "immagine": "https://images.stockx.com/images/Puma-Retro-#255-Product.jpg",
    "link": "https://stockx.com/puma-retro-#255"
  },
  {
    "modello": "converse cortez #256",
    "nome": "Converse Cortez #256",
    "sku": "COCO00256",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Converse-Cortez-#256-Product.jpg",
    "link": "https://stockx.com/converse-cortez-#256"
  },
  {
    "modello": "new balance dunk #257",
    "nome": "New Balance Dunk #257",
    "sku": "NEDU00257",
    "prezzo": "166",
    "immagine": "https://images.stockx.com/images/New-Balance-Dunk-#257-Product.jpg",
    "link": "https://stockx.com/new-balance-dunk-#257"
  },
  {
    "modello": "reebok retro #258",
    "nome": "Reebok Retro #258",
    "sku": "RERE00258",
    "prezzo": "312",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-#258-Product.jpg",
    "link": "https://stockx.com/reebok-retro-#258"
  },
  {
    "modello": "adidas ultra boost #259",
    "nome": "Adidas Ultra Boost #259",
    "sku": "ADUL00259",
    "prezzo": "319",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra-Boost-#259-Product.jpg",
    "link": "https://stockx.com/adidas-ultra-boost-#259"
  },
  {
    "modello": "nike air max #260",
    "nome": "Nike Air Max #260",
    "sku": "NIAI00260",
    "prezzo": "184",
    "immagine": "https://images.stockx.com/images/Nike-Air-Max-#260-Product.jpg",
    "link": "https://stockx.com/nike-air-max-#260"
  },
  {
    "modello": "jordan ultra boost #261",
    "nome": "Jordan Ultra Boost #261",
    "sku": "JOUL00261",
    "prezzo": "356",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra-Boost-#261-Product.jpg",
    "link": "https://stockx.com/jordan-ultra-boost-#261"
  },
  {
    "modello": "asics rs-x #262",
    "nome": "Asics RS-X #262",
    "sku": "ASRS00262",
    "prezzo": "183",
    "immagine": "https://images.stockx.com/images/Asics-RS-X-#262-Product.jpg",
    "link": "https://stockx.com/asics-rs-x-#262"
  },
  {
    "modello": "jordan retro #263",
    "nome": "Jordan Retro #263",
    "sku": "JORE00263",
    "prezzo": "252",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-#263-Product.jpg",
    "link": "https://stockx.com/jordan-retro-#263"
  },
  {
    "modello": "nike rs-x #264",
    "nome": "Nike RS-X #264",
    "sku": "NIRS00264",
    "prezzo": "302",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#264-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#264"
  },
  {
    "modello": "asics classic #265",
    "nome": "Asics Classic #265",
    "sku": "ASCL00265",
    "prezzo": "158",
    "immagine": "https://images.stockx.com/images/Asics-Classic-#265-Product.jpg",
    "link": "https://stockx.com/asics-classic-#265"
  },
  {
    "modello": "adidas cortez #266",
    "nome": "Adidas Cortez #266",
    "sku": "ADCO00266",
    "prezzo": "247",
    "immagine": "https://images.stockx.com/images/Adidas-Cortez-#266-Product.jpg",
    "link": "https://stockx.com/adidas-cortez-#266"
  },
  {
    "modello": "yeezy gel-lyte #267",
    "nome": "Yeezy Gel-Lyte #267",
    "sku": "YEGE00267",
    "prezzo": "118",
    "immagine": "https://images.stockx.com/images/Yeezy-Gel-Lyte-#267-Product.jpg",
    "link": "https://stockx.com/yeezy-gel-lyte-#267"
  },
  {
    "modello": "new balance suede #268",
    "nome": "New Balance Suede #268",
    "sku": "NESU00268",
    "prezzo": "143",
    "immagine": "https://images.stockx.com/images/New-Balance-Suede-#268-Product.jpg",
    "link": "https://stockx.com/new-balance-suede-#268"
  },
  {
    "modello": "jordan rs-x #269",
    "nome": "Jordan RS-X #269",
    "sku": "JORS00269",
    "prezzo": "178",
    "immagine": "https://images.stockx.com/images/Jordan-RS-X-#269-Product.jpg",
    "link": "https://stockx.com/jordan-rs-x-#269"
  },
  {
    "modello": "puma rs-x #270",
    "nome": "Puma RS-X #270",
    "sku": "PURS00270",
    "prezzo": "181",
    "immagine": "https://images.stockx.com/images/Puma-RS-X-#270-Product.jpg",
    "link": "https://stockx.com/puma-rs-x-#270"
  },
  {
    "modello": "jordan suede #271",
    "nome": "Jordan Suede #271",
    "sku": "JOSU00271",
    "prezzo": "385",
    "immagine": "https://images.stockx.com/images/Jordan-Suede-#271-Product.jpg",
    "link": "https://stockx.com/jordan-suede-#271"
  },
  {
    "modello": "asics air max #272",
    "nome": "Asics Air Max #272",
    "sku": "ASAI00272",
    "prezzo": "216",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#272-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#272"
  },
  {
    "modello": "asics air max #273",
    "nome": "Asics Air Max #273",
    "sku": "ASAI00273",
    "prezzo": "345",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#273-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#273"
  },
  {
    "modello": "asics ultra boost #274",
    "nome": "Asics Ultra Boost #274",
    "sku": "ASUL00274",
    "prezzo": "352",
    "immagine": "https://images.stockx.com/images/Asics-Ultra-Boost-#274-Product.jpg",
    "link": "https://stockx.com/asics-ultra-boost-#274"
  },
  {
    "modello": "reebok retro #275",
    "nome": "Reebok Retro #275",
    "sku": "RERE00275",
    "prezzo": "225",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-#275-Product.jpg",
    "link": "https://stockx.com/reebok-retro-#275"
  },
  {
    "modello": "new balance dunk #276",
    "nome": "New Balance Dunk #276",
    "sku": "NEDU00276",
    "prezzo": "328",
    "immagine": "https://images.stockx.com/images/New-Balance-Dunk-#276-Product.jpg",
    "link": "https://stockx.com/new-balance-dunk-#276"
  },
  {
    "modello": "asics air max #277",
    "nome": "Asics Air Max #277",
    "sku": "ASAI00277",
    "prezzo": "208",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#277-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#277"
  },
  {
    "modello": "jordan rs-x #278",
    "nome": "Jordan RS-X #278",
    "sku": "JORS00278",
    "prezzo": "337",
    "immagine": "https://images.stockx.com/images/Jordan-RS-X-#278-Product.jpg",
    "link": "https://stockx.com/jordan-rs-x-#278"
  },
  {
    "modello": "yeezy retro #279",
    "nome": "Yeezy Retro #279",
    "sku": "YERE00279",
    "prezzo": "354",
    "immagine": "https://images.stockx.com/images/Yeezy-Retro-#279-Product.jpg",
    "link": "https://stockx.com/yeezy-retro-#279"
  },
  {
    "modello": "puma rs-x #280",
    "nome": "Puma RS-X #280",
    "sku": "PURS00280",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Puma-RS-X-#280-Product.jpg",
    "link": "https://stockx.com/puma-rs-x-#280"
  },
  {
    "modello": "nike cortez #281",
    "nome": "Nike Cortez #281",
    "sku": "NICO00281",
    "prezzo": "223",
    "immagine": "https://images.stockx.com/images/Nike-Cortez-#281-Product.jpg",
    "link": "https://stockx.com/nike-cortez-#281"
  },
  {
    "modello": "jordan suede #282",
    "nome": "Jordan Suede #282",
    "sku": "JOSU00282",
    "prezzo": "189",
    "immagine": "https://images.stockx.com/images/Jordan-Suede-#282-Product.jpg",
    "link": "https://stockx.com/jordan-suede-#282"
  },
  {
    "modello": "jordan classic #283",
    "nome": "Jordan Classic #283",
    "sku": "JOCL00283",
    "prezzo": "106",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-#283-Product.jpg",
    "link": "https://stockx.com/jordan-classic-#283"
  },
  {
    "modello": "adidas zoom #284",
    "nome": "Adidas Zoom #284",
    "sku": "ADZO00284",
    "prezzo": "385",
    "immagine": "https://images.stockx.com/images/Adidas-Zoom-#284-Product.jpg",
    "link": "https://stockx.com/adidas-zoom-#284"
  },
  {
    "modello": "reebok air max #285",
    "nome": "Reebok Air Max #285",
    "sku": "REAI00285",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/Reebok-Air-Max-#285-Product.jpg",
    "link": "https://stockx.com/reebok-air-max-#285"
  },
  {
    "modello": "new balance suede #286",
    "nome": "New Balance Suede #286",
    "sku": "NESU00286",
    "prezzo": "93",
    "immagine": "https://images.stockx.com/images/New-Balance-Suede-#286-Product.jpg",
    "link": "https://stockx.com/new-balance-suede-#286"
  },
  {
    "modello": "asics cortez #287",
    "nome": "Asics Cortez #287",
    "sku": "ASCO00287",
    "prezzo": "306",
    "immagine": "https://images.stockx.com/images/Asics-Cortez-#287-Product.jpg",
    "link": "https://stockx.com/asics-cortez-#287"
  },
  {
    "modello": "nike zoom #288",
    "nome": "Nike Zoom #288",
    "sku": "NIZO00288",
    "prezzo": "190",
    "immagine": "https://images.stockx.com/images/Nike-Zoom-#288-Product.jpg",
    "link": "https://stockx.com/nike-zoom-#288"
  },
  {
    "modello": "new balance retro #289",
    "nome": "New Balance Retro #289",
    "sku": "NERE00289",
    "prezzo": "321",
    "immagine": "https://images.stockx.com/images/New-Balance-Retro-#289-Product.jpg",
    "link": "https://stockx.com/new-balance-retro-#289"
  },
  {
    "modello": "jordan zoom #290",
    "nome": "Jordan Zoom #290",
    "sku": "JOZO00290",
    "prezzo": "227",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#290-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#290"
  },
  {
    "modello": "adidas ultra boost #291",
    "nome": "Adidas Ultra Boost #291",
    "sku": "ADUL00291",
    "prezzo": "285",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra-Boost-#291-Product.jpg",
    "link": "https://stockx.com/adidas-ultra-boost-#291"
  },
  {
    "modello": "nike zoom #292",
    "nome": "Nike Zoom #292",
    "sku": "NIZO00292",
    "prezzo": "360",
    "immagine": "https://images.stockx.com/images/Nike-Zoom-#292-Product.jpg",
    "link": "https://stockx.com/nike-zoom-#292"
  },
  {
    "modello": "asics dunk #293",
    "nome": "Asics Dunk #293",
    "sku": "ASDU00293",
    "prezzo": "360",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-#293-Product.jpg",
    "link": "https://stockx.com/asics-dunk-#293"
  },
  {
    "modello": "asics rs-x #294",
    "nome": "Asics RS-X #294",
    "sku": "ASRS00294",
    "prezzo": "253",
    "immagine": "https://images.stockx.com/images/Asics-RS-X-#294-Product.jpg",
    "link": "https://stockx.com/asics-rs-x-#294"
  },
  {
    "modello": "asics air max #295",
    "nome": "Asics Air Max #295",
    "sku": "ASAI00295",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#295-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#295"
  },
  {
    "modello": "asics air max #296",
    "nome": "Asics Air Max #296",
    "sku": "ASAI00296",
    "prezzo": "302",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#296-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#296"
  },
  {
    "modello": "reebok ultra boost #297",
    "nome": "Reebok Ultra Boost #297",
    "sku": "REUL00297",
    "prezzo": "399",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra-Boost-#297-Product.jpg",
    "link": "https://stockx.com/reebok-ultra-boost-#297"
  },
  {
    "modello": "new balance cortez #298",
    "nome": "New Balance Cortez #298",
    "sku": "NECO00298",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/New-Balance-Cortez-#298-Product.jpg",
    "link": "https://stockx.com/new-balance-cortez-#298"
  },
  {
    "modello": "converse dunk #299",
    "nome": "Converse Dunk #299",
    "sku": "CODU00299",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-#299-Product.jpg",
    "link": "https://stockx.com/converse-dunk-#299"
  },
  {
    "modello": "reebok ultra boost #300",
    "nome": "Reebok Ultra Boost #300",
    "sku": "REUL00300",
    "prezzo": "148",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra-Boost-#300-Product.jpg",
    "link": "https://stockx.com/reebok-ultra-boost-#300"
  },
  {
    "modello": "adidas cortez #301",
    "nome": "Adidas Cortez #301",
    "sku": "ADCO00301",
    "prezzo": "269",
    "immagine": "https://images.stockx.com/images/Adidas-Cortez-#301-Product.jpg",
    "link": "https://stockx.com/adidas-cortez-#301"
  },
  {
    "modello": "asics rs-x #302",
    "nome": "Asics RS-X #302",
    "sku": "ASRS00302",
    "prezzo": "107",
    "immagine": "https://images.stockx.com/images/Asics-RS-X-#302-Product.jpg",
    "link": "https://stockx.com/asics-rs-x-#302"
  },
  {
    "modello": "nike rs-x #303",
    "nome": "Nike RS-X #303",
    "sku": "NIRS00303",
    "prezzo": "302",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#303-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#303"
  },
  {
    "modello": "jordan rs-x #304",
    "nome": "Jordan RS-X #304",
    "sku": "JORS00304",
    "prezzo": "146",
    "immagine": "https://images.stockx.com/images/Jordan-RS-X-#304-Product.jpg",
    "link": "https://stockx.com/jordan-rs-x-#304"
  },
  {
    "modello": "converse air max #305",
    "nome": "Converse Air Max #305",
    "sku": "COAI00305",
    "prezzo": "361",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#305-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#305"
  },
  {
    "modello": "puma suede #306",
    "nome": "Puma Suede #306",
    "sku": "PUSU00306",
    "prezzo": "388",
    "immagine": "https://images.stockx.com/images/Puma-Suede-#306-Product.jpg",
    "link": "https://stockx.com/puma-suede-#306"
  },
  {
    "modello": "new balance air max #307",
    "nome": "New Balance Air Max #307",
    "sku": "NEAI00307",
    "prezzo": "307",
    "immagine": "https://images.stockx.com/images/New-Balance-Air-Max-#307-Product.jpg",
    "link": "https://stockx.com/new-balance-air-max-#307"
  },
  {
    "modello": "nike dunk #308",
    "nome": "Nike Dunk #308",
    "sku": "NIDU00308",
    "prezzo": "333",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-#308-Product.jpg",
    "link": "https://stockx.com/nike-dunk-#308"
  },
  {
    "modello": "jordan rs-x #309",
    "nome": "Jordan RS-X #309",
    "sku": "JORS00309",
    "prezzo": "116",
    "immagine": "https://images.stockx.com/images/Jordan-RS-X-#309-Product.jpg",
    "link": "https://stockx.com/jordan-rs-x-#309"
  },
  {
    "modello": "new balance classic #310",
    "nome": "New Balance Classic #310",
    "sku": "NECL00310",
    "prezzo": "205",
    "immagine": "https://images.stockx.com/images/New-Balance-Classic-#310-Product.jpg",
    "link": "https://stockx.com/new-balance-classic-#310"
  },
  {
    "modello": "reebok suede #311",
    "nome": "Reebok Suede #311",
    "sku": "RESU00311",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/Reebok-Suede-#311-Product.jpg",
    "link": "https://stockx.com/reebok-suede-#311"
  },
  {
    "modello": "puma classic #312",
    "nome": "Puma Classic #312",
    "sku": "PUCL00312",
    "prezzo": "222",
    "immagine": "https://images.stockx.com/images/Puma-Classic-#312-Product.jpg",
    "link": "https://stockx.com/puma-classic-#312"
  },
  {
    "modello": "new balance suede #313",
    "nome": "New Balance Suede #313",
    "sku": "NESU00313",
    "prezzo": "124",
    "immagine": "https://images.stockx.com/images/New-Balance-Suede-#313-Product.jpg",
    "link": "https://stockx.com/new-balance-suede-#313"
  },
  {
    "modello": "new balance rs-x #314",
    "nome": "New Balance RS-X #314",
    "sku": "NERS00314",
    "prezzo": "180",
    "immagine": "https://images.stockx.com/images/New-Balance-RS-X-#314-Product.jpg",
    "link": "https://stockx.com/new-balance-rs-x-#314"
  },
  {
    "modello": "asics zoom #315",
    "nome": "Asics Zoom #315",
    "sku": "ASZO00315",
    "prezzo": "185",
    "immagine": "https://images.stockx.com/images/Asics-Zoom-#315-Product.jpg",
    "link": "https://stockx.com/asics-zoom-#315"
  },
  {
    "modello": "converse cortez #316",
    "nome": "Converse Cortez #316",
    "sku": "COCO00316",
    "prezzo": "331",
    "immagine": "https://images.stockx.com/images/Converse-Cortez-#316-Product.jpg",
    "link": "https://stockx.com/converse-cortez-#316"
  },
  {
    "modello": "adidas dunk #317",
    "nome": "Adidas Dunk #317",
    "sku": "ADDU00317",
    "prezzo": "380",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-#317-Product.jpg",
    "link": "https://stockx.com/adidas-dunk-#317"
  },
  {
    "modello": "nike air max #318",
    "nome": "Nike Air Max #318",
    "sku": "NIAI00318",
    "prezzo": "379",
    "immagine": "https://images.stockx.com/images/Nike-Air-Max-#318-Product.jpg",
    "link": "https://stockx.com/nike-air-max-#318"
  },
  {
    "modello": "nike rs-x #319",
    "nome": "Nike RS-X #319",
    "sku": "NIRS00319",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#319-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#319"
  },
  {
    "modello": "asics ultra boost #320",
    "nome": "Asics Ultra Boost #320",
    "sku": "ASUL00320",
    "prezzo": "334",
    "immagine": "https://images.stockx.com/images/Asics-Ultra-Boost-#320-Product.jpg",
    "link": "https://stockx.com/asics-ultra-boost-#320"
  },
  {
    "modello": "reebok ultra boost #321",
    "nome": "Reebok Ultra Boost #321",
    "sku": "REUL00321",
    "prezzo": "143",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra-Boost-#321-Product.jpg",
    "link": "https://stockx.com/reebok-ultra-boost-#321"
  },
  {
    "modello": "converse gel-lyte #322",
    "nome": "Converse Gel-Lyte #322",
    "sku": "COGE00322",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-#322-Product.jpg",
    "link": "https://stockx.com/converse-gel-lyte-#322"
  },
  {
    "modello": "new balance dunk #323",
    "nome": "New Balance Dunk #323",
    "sku": "NEDU00323",
    "prezzo": "257",
    "immagine": "https://images.stockx.com/images/New-Balance-Dunk-#323-Product.jpg",
    "link": "https://stockx.com/new-balance-dunk-#323"
  },
  {
    "modello": "jordan suede #324",
    "nome": "Jordan Suede #324",
    "sku": "JOSU00324",
    "prezzo": "391",
    "immagine": "https://images.stockx.com/images/Jordan-Suede-#324-Product.jpg",
    "link": "https://stockx.com/jordan-suede-#324"
  },
  {
    "modello": "yeezy gel-lyte #325",
    "nome": "Yeezy Gel-Lyte #325",
    "sku": "YEGE00325",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/Yeezy-Gel-Lyte-#325-Product.jpg",
    "link": "https://stockx.com/yeezy-gel-lyte-#325"
  },
  {
    "modello": "new balance retro #326",
    "nome": "New Balance Retro #326",
    "sku": "NERE00326",
    "prezzo": "367",
    "immagine": "https://images.stockx.com/images/New-Balance-Retro-#326-Product.jpg",
    "link": "https://stockx.com/new-balance-retro-#326"
  },
  {
    "modello": "new balance zoom #327",
    "nome": "New Balance Zoom #327",
    "sku": "NEZO00327",
    "prezzo": "196",
    "immagine": "https://images.stockx.com/images/New-Balance-Zoom-#327-Product.jpg",
    "link": "https://stockx.com/new-balance-zoom-#327"
  },
  {
    "modello": "asics air max #328",
    "nome": "Asics Air Max #328",
    "sku": "ASAI00328",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/Asics-Air-Max-#328-Product.jpg",
    "link": "https://stockx.com/asics-air-max-#328"
  },
  {
    "modello": "asics cortez #329",
    "nome": "Asics Cortez #329",
    "sku": "ASCO00329",
    "prezzo": "236",
    "immagine": "https://images.stockx.com/images/Asics-Cortez-#329-Product.jpg",
    "link": "https://stockx.com/asics-cortez-#329"
  },
  {
    "modello": "new balance air max #330",
    "nome": "New Balance Air Max #330",
    "sku": "NEAI00330",
    "prezzo": "392",
    "immagine": "https://images.stockx.com/images/New-Balance-Air-Max-#330-Product.jpg",
    "link": "https://stockx.com/new-balance-air-max-#330"
  },
  {
    "modello": "puma ultra boost #331",
    "nome": "Puma Ultra Boost #331",
    "sku": "PUUL00331",
    "prezzo": "192",
    "immagine": "https://images.stockx.com/images/Puma-Ultra-Boost-#331-Product.jpg",
    "link": "https://stockx.com/puma-ultra-boost-#331"
  },
  {
    "modello": "reebok dunk #332",
    "nome": "Reebok Dunk #332",
    "sku": "REDU00332",
    "prezzo": "251",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-#332-Product.jpg",
    "link": "https://stockx.com/reebok-dunk-#332"
  },
  {
    "modello": "converse rs-x #333",
    "nome": "Converse RS-X #333",
    "sku": "CORS00333",
    "prezzo": "292",
    "immagine": "https://images.stockx.com/images/Converse-RS-X-#333-Product.jpg",
    "link": "https://stockx.com/converse-rs-x-#333"
  },
  {
    "modello": "converse classic #334",
    "nome": "Converse Classic #334",
    "sku": "COCL00334",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Converse-Classic-#334-Product.jpg",
    "link": "https://stockx.com/converse-classic-#334"
  },
  {
    "modello": "converse zoom #335",
    "nome": "Converse Zoom #335",
    "sku": "COZO00335",
    "prezzo": "111",
    "immagine": "https://images.stockx.com/images/Converse-Zoom-#335-Product.jpg",
    "link": "https://stockx.com/converse-zoom-#335"
  },
  {
    "modello": "asics dunk #336",
    "nome": "Asics Dunk #336",
    "sku": "ASDU00336",
    "prezzo": "182",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-#336-Product.jpg",
    "link": "https://stockx.com/asics-dunk-#336"
  },
  {
    "modello": "jordan ultra boost #337",
    "nome": "Jordan Ultra Boost #337",
    "sku": "JOUL00337",
    "prezzo": "177",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra-Boost-#337-Product.jpg",
    "link": "https://stockx.com/jordan-ultra-boost-#337"
  },
  {
    "modello": "nike rs-x #338",
    "nome": "Nike RS-X #338",
    "sku": "NIRS00338",
    "prezzo": "265",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#338-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#338"
  },
  {
    "modello": "reebok rs-x #339",
    "nome": "Reebok RS-X #339",
    "sku": "RERS00339",
    "prezzo": "308",
    "immagine": "https://images.stockx.com/images/Reebok-RS-X-#339-Product.jpg",
    "link": "https://stockx.com/reebok-rs-x-#339"
  },
  {
    "modello": "yeezy gel-lyte #340",
    "nome": "Yeezy Gel-Lyte #340",
    "sku": "YEGE00340",
    "prezzo": "333",
    "immagine": "https://images.stockx.com/images/Yeezy-Gel-Lyte-#340-Product.jpg",
    "link": "https://stockx.com/yeezy-gel-lyte-#340"
  },
  {
    "modello": "asics cortez #341",
    "nome": "Asics Cortez #341",
    "sku": "ASCO00341",
    "prezzo": "207",
    "immagine": "https://images.stockx.com/images/Asics-Cortez-#341-Product.jpg",
    "link": "https://stockx.com/asics-cortez-#341"
  },
  {
    "modello": "nike classic #342",
    "nome": "Nike Classic #342",
    "sku": "NICL00342",
    "prezzo": "310",
    "immagine": "https://images.stockx.com/images/Nike-Classic-#342-Product.jpg",
    "link": "https://stockx.com/nike-classic-#342"
  },
  {
    "modello": "converse suede #343",
    "nome": "Converse Suede #343",
    "sku": "COSU00343",
    "prezzo": "108",
    "immagine": "https://images.stockx.com/images/Converse-Suede-#343-Product.jpg",
    "link": "https://stockx.com/converse-suede-#343"
  },
  {
    "modello": "asics gel-lyte #344",
    "nome": "Asics Gel-Lyte #344",
    "sku": "ASGE00344",
    "prezzo": "141",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-#344-Product.jpg",
    "link": "https://stockx.com/asics-gel-lyte-#344"
  },
  {
    "modello": "nike zoom #345",
    "nome": "Nike Zoom #345",
    "sku": "NIZO00345",
    "prezzo": "126",
    "immagine": "https://images.stockx.com/images/Nike-Zoom-#345-Product.jpg",
    "link": "https://stockx.com/nike-zoom-#345"
  },
  {
    "modello": "converse air max #346",
    "nome": "Converse Air Max #346",
    "sku": "COAI00346",
    "prezzo": "113",
    "immagine": "https://images.stockx.com/images/Converse-Air-Max-#346-Product.jpg",
    "link": "https://stockx.com/converse-air-max-#346"
  },
  {
    "modello": "puma classic #347",
    "nome": "Puma Classic #347",
    "sku": "PUCL00347",
    "prezzo": "177",
    "immagine": "https://images.stockx.com/images/Puma-Classic-#347-Product.jpg",
    "link": "https://stockx.com/puma-classic-#347"
  },
  {
    "modello": "converse zoom #348",
    "nome": "Converse Zoom #348",
    "sku": "COZO00348",
    "prezzo": "93",
    "immagine": "https://images.stockx.com/images/Converse-Zoom-#348-Product.jpg",
    "link": "https://stockx.com/converse-zoom-#348"
  },
  {
    "modello": "asics zoom #349",
    "nome": "Asics Zoom #349",
    "sku": "ASZO00349",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/Asics-Zoom-#349-Product.jpg",
    "link": "https://stockx.com/asics-zoom-#349"
  },
  {
    "modello": "puma dunk #350",
    "nome": "Puma Dunk #350",
    "sku": "PUDU00350",
    "prezzo": "395",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-#350-Product.jpg",
    "link": "https://stockx.com/puma-dunk-#350"
  },
  {
    "modello": "adidas rs-x #351",
    "nome": "Adidas RS-X #351",
    "sku": "ADRS00351",
    "prezzo": "254",
    "immagine": "https://images.stockx.com/images/Adidas-RS-X-#351-Product.jpg",
    "link": "https://stockx.com/adidas-rs-x-#351"
  },
  {
    "modello": "puma air max #352",
    "nome": "Puma Air Max #352",
    "sku": "PUAI00352",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Puma-Air-Max-#352-Product.jpg",
    "link": "https://stockx.com/puma-air-max-#352"
  },
  {
    "modello": "new balance ultra boost #353",
    "nome": "New Balance Ultra Boost #353",
    "sku": "NEUL00353",
    "prezzo": "182",
    "immagine": "https://images.stockx.com/images/New-Balance-Ultra-Boost-#353-Product.jpg",
    "link": "https://stockx.com/new-balance-ultra-boost-#353"
  },
  {
    "modello": "nike air max #354",
    "nome": "Nike Air Max #354",
    "sku": "NIAI00354",
    "prezzo": "149",
    "immagine": "https://images.stockx.com/images/Nike-Air-Max-#354-Product.jpg",
    "link": "https://stockx.com/nike-air-max-#354"
  },
  {
    "modello": "adidas rs-x #355",
    "nome": "Adidas RS-X #355",
    "sku": "ADRS00355",
    "prezzo": "141",
    "immagine": "https://images.stockx.com/images/Adidas-RS-X-#355-Product.jpg",
    "link": "https://stockx.com/adidas-rs-x-#355"
  },
  {
    "modello": "asics classic #356",
    "nome": "Asics Classic #356",
    "sku": "ASCL00356",
    "prezzo": "352",
    "immagine": "https://images.stockx.com/images/Asics-Classic-#356-Product.jpg",
    "link": "https://stockx.com/asics-classic-#356"
  },
  {
    "modello": "yeezy cortez #357",
    "nome": "Yeezy Cortez #357",
    "sku": "YECO00357",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/Yeezy-Cortez-#357-Product.jpg",
    "link": "https://stockx.com/yeezy-cortez-#357"
  },
  {
    "modello": "converse suede #358",
    "nome": "Converse Suede #358",
    "sku": "COSU00358",
    "prezzo": "97",
    "immagine": "https://images.stockx.com/images/Converse-Suede-#358-Product.jpg",
    "link": "https://stockx.com/converse-suede-#358"
  },
  {
    "modello": "nike ultra boost #359",
    "nome": "Nike Ultra Boost #359",
    "sku": "NIUL00359",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/Nike-Ultra-Boost-#359-Product.jpg",
    "link": "https://stockx.com/nike-ultra-boost-#359"
  },
  {
    "modello": "new balance gel-lyte #360",
    "nome": "New Balance Gel-Lyte #360",
    "sku": "NEGE00360",
    "prezzo": "361",
    "immagine": "https://images.stockx.com/images/New-Balance-Gel-Lyte-#360-Product.jpg",
    "link": "https://stockx.com/new-balance-gel-lyte-#360"
  },
  {
    "modello": "puma air max #361",
    "nome": "Puma Air Max #361",
    "sku": "PUAI00361",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/Puma-Air-Max-#361-Product.jpg",
    "link": "https://stockx.com/puma-air-max-#361"
  },
  {
    "modello": "nike rs-x #362",
    "nome": "Nike RS-X #362",
    "sku": "NIRS00362",
    "prezzo": "90",
    "immagine": "https://images.stockx.com/images/Nike-RS-X-#362-Product.jpg",
    "link": "https://stockx.com/nike-rs-x-#362"
  },
  {
    "modello": "converse ultra boost #363",
    "nome": "Converse Ultra Boost #363",
    "sku": "COUL00363",
    "prezzo": "147",
    "immagine": "https://images.stockx.com/images/Converse-Ultra-Boost-#363-Product.jpg",
    "link": "https://stockx.com/converse-ultra-boost-#363"
  },
  {
    "modello": "jordan zoom #364",
    "nome": "Jordan Zoom #364",
    "sku": "JOZO00364",
    "prezzo": "312",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#364-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#364"
  },
  {
    "modello": "adidas ultra boost #365",
    "nome": "Adidas Ultra Boost #365",
    "sku": "ADUL00365",
    "prezzo": "362",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra-Boost-#365-Product.jpg",
    "link": "https://stockx.com/adidas-ultra-boost-#365"
  },
  {
    "modello": "reebok dunk #366",
    "nome": "Reebok Dunk #366",
    "sku": "REDU00366",
    "prezzo": "128",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-#366-Product.jpg",
    "link": "https://stockx.com/reebok-dunk-#366"
  },
  {
    "modello": "new balance zoom #367",
    "nome": "New Balance Zoom #367",
    "sku": "NEZO00367",
    "prezzo": "263",
    "immagine": "https://images.stockx.com/images/New-Balance-Zoom-#367-Product.jpg",
    "link": "https://stockx.com/new-balance-zoom-#367"
  },
  {
    "modello": "converse dunk #368",
    "nome": "Converse Dunk #368",
    "sku": "CODU00368",
    "prezzo": "256",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-#368-Product.jpg",
    "link": "https://stockx.com/converse-dunk-#368"
  },
  {
    "modello": "converse classic #369",
    "nome": "Converse Classic #369",
    "sku": "COCL00369",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/Converse-Classic-#369-Product.jpg",
    "link": "https://stockx.com/converse-classic-#369"
  },
  {
    "modello": "reebok classic #370",
    "nome": "Reebok Classic #370",
    "sku": "RECL00370",
    "prezzo": "292",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-#370-Product.jpg",
    "link": "https://stockx.com/reebok-classic-#370"
  },
  {
    "modello": "asics suede #371",
    "nome": "Asics Suede #371",
    "sku": "ASSU00371",
    "prezzo": "279",
    "immagine": "https://images.stockx.com/images/Asics-Suede-#371-Product.jpg",
    "link": "https://stockx.com/asics-suede-#371"
  },
  {
    "modello": "jordan ultra boost #372",
    "nome": "Jordan Ultra Boost #372",
    "sku": "JOUL00372",
    "prezzo": "298",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra-Boost-#372-Product.jpg",
    "link": "https://stockx.com/jordan-ultra-boost-#372"
  },
  {
    "modello": "puma zoom #373",
    "nome": "Puma Zoom #373",
    "sku": "PUZO00373",
    "prezzo": "325",
    "immagine": "https://images.stockx.com/images/Puma-Zoom-#373-Product.jpg",
    "link": "https://stockx.com/puma-zoom-#373"
  },
  {
    "modello": "jordan zoom #374",
    "nome": "Jordan Zoom #374",
    "sku": "JOZO00374",
    "prezzo": "266",
    "immagine": "https://images.stockx.com/images/Jordan-Zoom-#374-Product.jpg",
    "link": "https://stockx.com/jordan-zoom-#374"
  },
  {
    "modello": "new balance suede #375",
    "nome": "New Balance Suede #375",
    "sku": "NESU00375",
    "prezzo": "387",
    "immagine": "https://images.stockx.com/images/New-Balance-Suede-#375-Product.jpg",
    "link": "https://stockx.com/new-balance-suede-#375"
  },
  {
    "modello": "jordan gel-lyte #376",
    "nome": "Jordan Gel-Lyte #376",
    "sku": "JOGE00376",
    "prezzo": "330",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-#376-Product.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-#376"
  },
  {
    "modello": "jordan retro #377",
    "nome": "Jordan Retro #377",
    "sku": "JORE00377",
    "prezzo": "211",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-#377-Product.jpg",
    "link": "https://stockx.com/jordan-retro-#377"
  },
  {
    "modello": "jordan ultra boost #378",
    "nome": "Jordan Ultra Boost #378",
    "sku": "JOUL00378",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra-Boost-#378-Product.jpg",
    "link": "https://stockx.com/jordan-ultra-boost-#378"
  },
  {
    "modello": "yeezy dunk #379",
    "nome": "Yeezy Dunk #379",
    "sku": "YEDU00379",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/Yeezy-Dunk-#379-Product.jpg",
    "link": "https://stockx.com/yeezy-dunk-#379"
  },
  {
    "modello": "puma classic #380",
    "nome": "Puma Classic #380",
    "sku": "PUCL00380",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Puma-Classic-#380-Product.jpg",
    "link": "https://stockx.com/puma-classic-#380"
  },
  {
    "modello": "nike suede #381",
    "nome": "Nike Suede #381",
    "sku": "NISU00381",
    "prezzo": "124",
    "immagine": "https://images.stockx.com/images/Nike-Suede-#381-Product.jpg",
    "link": "https://stockx.com/nike-suede-#381"
  },
  {
    "modello": "new balance dunk #382",
    "nome": "New Balance Dunk #382",
    "sku": "NEDU00382",
    "prezzo": "316",
    "immagine": "https://images.stockx.com/images/New-Balance-Dunk-#382-Product.jpg",
    "link": "https://stockx.com/new-balance-dunk-#382"
  },
  {
    "modello": "adidas ultra boost #383",
    "nome": "Adidas Ultra Boost #383",
    "sku": "ADUL00383",
    "prezzo": "286",
    "immagine": "https://images.stoc…"
