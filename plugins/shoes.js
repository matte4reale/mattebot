let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const query = args.join(' ').toLowerCase();

  // 🔽 Dataset interno
  const scarpe = [
    {
    "modello": "yeezy superstar high",
    "nome": "Yeezy Superstar High",
    "sku": "YESUHI0001",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/sneaker-1.jpg",
    "link": "https://stockx.com/yeezy-superstar-high-1"
  },
  {
    "modello": "new balance classic runner",
    "nome": "New Balance Classic Runner",
    "sku": "NECLRU0002",
    "prezzo": "102",
    "immagine": "https://images.stockx.com/images/sneaker-2.jpg",
    "link": "https://stockx.com/new balance-classic-runner-2"
  },
  {
    "modello": "jordan gel-lyte retro",
    "nome": "Jordan Gel-Lyte Retro",
    "sku": "JOGERE0003",
    "prezzo": "103",
    "immagine": "https://images.stockx.com/images/sneaker-3.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-retro-3"
  },
  {
    "modello": "puma classic high",
    "nome": "Puma Classic High",
    "sku": "PUCLHI0004",
    "prezzo": "104",
    "immagine": "https://images.stockx.com/images/sneaker-4.jpg",
    "link": "https://stockx.com/puma-classic-high-4"
  },
  {
    "modello": "new balance air max slide",
    "nome": "New Balance Air Max Slide",
    "sku": "NEAISL0005",
    "prezzo": "105",
    "immagine": "https://images.stockx.com/images/sneaker-5.jpg",
    "link": "https://stockx.com/new balance-air max-slide-5"
  },
  {
    "modello": "puma react slide",
    "nome": "Puma React Slide",
    "sku": "PURESL0006",
    "prezzo": "106",
    "immagine": "https://images.stockx.com/images/sneaker-6.jpg",
    "link": "https://stockx.com/puma-react-slide-6"
  },
  {
    "modello": "jordan skate runner",
    "nome": "Jordan Skate Runner",
    "sku": "JOSKRU0007",
    "prezzo": "107",
    "immagine": "https://images.stockx.com/images/sneaker-7.jpg",
    "link": "https://stockx.com/jordan-skate-runner-7"
  },
  {
    "modello": "jordan gel-lyte runner",
    "nome": "Jordan Gel-Lyte Runner",
    "sku": "JOGERU0008",
    "prezzo": "108",
    "immagine": "https://images.stockx.com/images/sneaker-8.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-runner-8"
  },
  {
    "modello": "adidas forum canvas",
    "nome": "Adidas Forum Canvas",
    "sku": "ADFOCA0009",
    "prezzo": "109",
    "immagine": "https://images.stockx.com/images/sneaker-9.jpg",
    "link": "https://stockx.com/adidas-forum-canvas-9"
  },
  {
    "modello": "yeezy classic high",
    "nome": "Yeezy Classic High",
    "sku": "YECLHI0010",
    "prezzo": "110",
    "immagine": "https://images.stockx.com/images/sneaker-10.jpg",
    "link": "https://stockx.com/yeezy-classic-high-10"
  },
  {
    "modello": "new balance skate high",
    "nome": "New Balance Skate High",
    "sku": "NESKHI0011",
    "prezzo": "111",
    "immagine": "https://images.stockx.com/images/sneaker-11.jpg",
    "link": "https://stockx.com/new balance-skate-high-11"
  },
  {
    "modello": "nike forum high",
    "nome": "Nike Forum High",
    "sku": "NIFOHI0012",
    "prezzo": "112",
    "immagine": "https://images.stockx.com/images/sneaker-12.jpg",
    "link": "https://stockx.com/nike-forum-high-12"
  },
  {
    "modello": "yeezy classic low",
    "nome": "Yeezy Classic Low",
    "sku": "YECLLO0013",
    "prezzo": "113",
    "immagine": "https://images.stockx.com/images/sneaker-13.jpg",
    "link": "https://stockx.com/yeezy-classic-low-13"
  },
  {
    "modello": "asics superstar boost",
    "nome": "Asics Superstar Boost",
    "sku": "ASSUBO0014",
    "prezzo": "114",
    "immagine": "https://images.stockx.com/images/sneaker-14.jpg",
    "link": "https://stockx.com/asics-superstar-boost-14"
  },
  {
    "modello": "asics classic canvas",
    "nome": "Asics Classic Canvas",
    "sku": "ASCLCA0015",
    "prezzo": "115",
    "immagine": "https://images.stockx.com/images/sneaker-15.jpg",
    "link": "https://stockx.com/asics-classic-canvas-15"
  },
  {
    "modello": "reebok gel-lyte slide",
    "nome": "Reebok Gel-Lyte Slide",
    "sku": "REGESL0016",
    "prezzo": "116",
    "immagine": "https://images.stockx.com/images/sneaker-16.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-slide-16"
  },
  {
    "modello": "adidas superstar runner",
    "nome": "Adidas Superstar Runner",
    "sku": "ADSURU0017",
    "prezzo": "117",
    "immagine": "https://images.stockx.com/images/sneaker-17.jpg",
    "link": "https://stockx.com/adidas-superstar-runner-17"
  },
  {
    "modello": "yeezy dunk boost",
    "nome": "Yeezy Dunk Boost",
    "sku": "YEDUBO0018",
    "prezzo": "118",
    "immagine": "https://images.stockx.com/images/sneaker-18.jpg",
    "link": "https://stockx.com/yeezy-dunk-boost-18"
  },
  {
    "modello": "yeezy club c zoom",
    "nome": "Yeezy Club C Zoom",
    "sku": "YECLZO0019",
    "prezzo": "119",
    "immagine": "https://images.stockx.com/images/sneaker-19.jpg",
    "link": "https://stockx.com/yeezy-club c-zoom-19"
  },
  {
    "modello": "reebok forum flyknit",
    "nome": "Reebok Forum Flyknit",
    "sku": "REFOFL0020",
    "prezzo": "120",
    "immagine": "https://images.stockx.com/images/sneaker-20.jpg",
    "link": "https://stockx.com/reebok-forum-flyknit-20"
  },
  {
    "modello": "reebok yeezy boost flyknit",
    "nome": "Reebok Yeezy Boost Flyknit",
    "sku": "REYEFL0021",
    "prezzo": "121",
    "immagine": "https://images.stockx.com/images/sneaker-21.jpg",
    "link": "https://stockx.com/reebok-yeezy boost-flyknit-21"
  },
  {
    "modello": "asics skate boost",
    "nome": "Asics Skate Boost",
    "sku": "ASSKBO0022",
    "prezzo": "122",
    "immagine": "https://images.stockx.com/images/sneaker-22.jpg",
    "link": "https://stockx.com/asics-skate-boost-22"
  },
  {
    "modello": "adidas dunk slide",
    "nome": "Adidas Dunk Slide",
    "sku": "ADDUSL0023",
    "prezzo": "123",
    "immagine": "https://images.stockx.com/images/sneaker-23.jpg",
    "link": "https://stockx.com/adidas-dunk-slide-23"
  },
  {
    "modello": "under armour react flyknit",
    "nome": "Under Armour React Flyknit",
    "sku": "UNREFL0024",
    "prezzo": "124",
    "immagine": "https://images.stockx.com/images/sneaker-24.jpg",
    "link": "https://stockx.com/under armour-react-flyknit-24"
  },
  {
    "modello": "adidas dunk mid",
    "nome": "Adidas Dunk Mid",
    "sku": "ADDUMI0025",
    "prezzo": "125",
    "immagine": "https://images.stockx.com/images/sneaker-25.jpg",
    "link": "https://stockx.com/adidas-dunk-mid-25"
  },
  {
    "modello": "new balance gel-lyte retro",
    "nome": "New Balance Gel-Lyte Retro",
    "sku": "NEGERE0026",
    "prezzo": "126",
    "immagine": "https://images.stockx.com/images/sneaker-26.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-retro-26"
  },
  {
    "modello": "reebok react low",
    "nome": "Reebok React Low",
    "sku": "RERELO0027",
    "prezzo": "127",
    "immagine": "https://images.stockx.com/images/sneaker-27.jpg",
    "link": "https://stockx.com/reebok-react-low-27"
  },
  {
    "modello": "puma dunk zoom",
    "nome": "Puma Dunk Zoom",
    "sku": "PUDUZO0028",
    "prezzo": "128",
    "immagine": "https://images.stockx.com/images/sneaker-28.jpg",
    "link": "https://stockx.com/puma-dunk-zoom-28"
  },
  {
    "modello": "yeezy club c mid",
    "nome": "Yeezy Club C Mid",
    "sku": "YECLMI0029",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/sneaker-29.jpg",
    "link": "https://stockx.com/yeezy-club c-mid-29"
  },
  {
    "modello": "asics superstar boost",
    "nome": "Asics Superstar Boost",
    "sku": "ASSUBO0030",
    "prezzo": "130",
    "immagine": "https://images.stockx.com/images/sneaker-30.jpg",
    "link": "https://stockx.com/asics-superstar-boost-30"
  },
  {
    "modello": "new balance classic flyknit",
    "nome": "New Balance Classic Flyknit",
    "sku": "NECLFL0031",
    "prezzo": "131",
    "immagine": "https://images.stockx.com/images/sneaker-31.jpg",
    "link": "https://stockx.com/new balance-classic-flyknit-31"
  },
  {
    "modello": "asics yeezy boost canvas",
    "nome": "Asics Yeezy Boost Canvas",
    "sku": "ASYECA0032",
    "prezzo": "132",
    "immagine": "https://images.stockx.com/images/sneaker-32.jpg",
    "link": "https://stockx.com/asics-yeezy boost-canvas-32"
  },
  {
    "modello": "under armour yeezy boost zoom",
    "nome": "Under Armour Yeezy Boost Zoom",
    "sku": "UNYEZO0033",
    "prezzo": "133",
    "immagine": "https://images.stockx.com/images/sneaker-33.jpg",
    "link": "https://stockx.com/under armour-yeezy boost-zoom-33"
  },
  {
    "modello": "adidas skate canvas",
    "nome": "Adidas Skate Canvas",
    "sku": "ADSKCA0034",
    "prezzo": "134",
    "immagine": "https://images.stockx.com/images/sneaker-34.jpg",
    "link": "https://stockx.com/adidas-skate-canvas-34"
  },
  {
    "modello": "asics skate low",
    "nome": "Asics Skate Low",
    "sku": "ASSKLO0035",
    "prezzo": "135",
    "immagine": "https://images.stockx.com/images/sneaker-35.jpg",
    "link": "https://stockx.com/asics-skate-low-35"
  },
  {
    "modello": "asics dunk flyknit",
    "nome": "Asics Dunk Flyknit",
    "sku": "ASDUFL0036",
    "prezzo": "136",
    "immagine": "https://images.stockx.com/images/sneaker-36.jpg",
    "link": "https://stockx.com/asics-dunk-flyknit-36"
  },
  {
    "modello": "puma superstar slide",
    "nome": "Puma Superstar Slide",
    "sku": "PUSUSL0037",
    "prezzo": "137",
    "immagine": "https://images.stockx.com/images/sneaker-37.jpg",
    "link": "https://stockx.com/puma-superstar-slide-37"
  },
  {
    "modello": "reebok gel-lyte flyknit",
    "nome": "Reebok Gel-Lyte Flyknit",
    "sku": "REGEFL0038",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/sneaker-38.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-flyknit-38"
  },
  {
    "modello": "yeezy superstar flyknit",
    "nome": "Yeezy Superstar Flyknit",
    "sku": "YESUFL0039",
    "prezzo": "139",
    "immagine": "https://images.stockx.com/images/sneaker-39.jpg",
    "link": "https://stockx.com/yeezy-superstar-flyknit-39"
  },
  {
    "modello": "asics superstar mid",
    "nome": "Asics Superstar Mid",
    "sku": "ASSUMI0040",
    "prezzo": "140",
    "immagine": "https://images.stockx.com/images/sneaker-40.jpg",
    "link": "https://stockx.com/asics-superstar-mid-40"
  },
  {
    "modello": "converse club c zoom",
    "nome": "Converse Club C Zoom",
    "sku": "COCLZO0041",
    "prezzo": "141",
    "immagine": "https://images.stockx.com/images/sneaker-41.jpg",
    "link": "https://stockx.com/converse-club c-zoom-41"
  },
  {
    "modello": "converse yeezy boost retro",
    "nome": "Converse Yeezy Boost Retro",
    "sku": "COYERE0042",
    "prezzo": "142",
    "immagine": "https://images.stockx.com/images/sneaker-42.jpg",
    "link": "https://stockx.com/converse-yeezy boost-retro-42"
  },
  {
    "modello": "new balance superstar high",
    "nome": "New Balance Superstar High",
    "sku": "NESUHI0043",
    "prezzo": "143",
    "immagine": "https://images.stockx.com/images/sneaker-43.jpg",
    "link": "https://stockx.com/new balance-superstar-high-43"
  },
  {
    "modello": "puma react low",
    "nome": "Puma React Low",
    "sku": "PURELO0044",
    "prezzo": "144",
    "immagine": "https://images.stockx.com/images/sneaker-44.jpg",
    "link": "https://stockx.com/puma-react-low-44"
  },
  {
    "modello": "new balance skate runner",
    "nome": "New Balance Skate Runner",
    "sku": "NESKRU0045",
    "prezzo": "145",
    "immagine": "https://images.stockx.com/images/sneaker-45.jpg",
    "link": "https://stockx.com/new balance-skate-runner-45"
  },
  {
    "modello": "reebok superstar zoom",
    "nome": "Reebok Superstar Zoom",
    "sku": "RESUZO0046",
    "prezzo": "146",
    "immagine": "https://images.stockx.com/images/sneaker-46.jpg",
    "link": "https://stockx.com/reebok-superstar-zoom-46"
  },
  {
    "modello": "yeezy skate zoom",
    "nome": "Yeezy Skate Zoom",
    "sku": "YESKZO0047",
    "prezzo": "147",
    "immagine": "https://images.stockx.com/images/sneaker-47.jpg",
    "link": "https://stockx.com/yeezy-skate-zoom-47"
  },
  {
    "modello": "under armour react low",
    "nome": "Under Armour React Low",
    "sku": "UNRELO0048",
    "prezzo": "148",
    "immagine": "https://images.stockx.com/images/sneaker-48.jpg",
    "link": "https://stockx.com/under armour-react-low-48"
  },
  {
    "modello": "converse forum boost",
    "nome": "Converse Forum Boost",
    "sku": "COFOBO0049",
    "prezzo": "149",
    "immagine": "https://images.stockx.com/images/sneaker-49.jpg",
    "link": "https://stockx.com/converse-forum-boost-49"
  },
  {
    "modello": "new balance classic runner",
    "nome": "New Balance Classic Runner",
    "sku": "NECLRU0050",
    "prezzo": "150",
    "immagine": "https://images.stockx.com/images/sneaker-50.jpg",
    "link": "https://stockx.com/new balance-classic-runner-50"
  },
  {
    "modello": "nike club c retro",
    "nome": "Nike Club C Retro",
    "sku": "NICLRE0051",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/sneaker-51.jpg",
    "link": "https://stockx.com/nike-club c-retro-51"
  },
  {
    "modello": "jordan yeezy boost mid",
    "nome": "Jordan Yeezy Boost Mid",
    "sku": "JOYEMI0052",
    "prezzo": "152",
    "immagine": "https://images.stockx.com/images/sneaker-52.jpg",
    "link": "https://stockx.com/jordan-yeezy boost-mid-52"
  },
  {
    "modello": "new balance air max high",
    "nome": "New Balance Air Max High",
    "sku": "NEAIHI0053",
    "prezzo": "153",
    "immagine": "https://images.stockx.com/images/sneaker-53.jpg",
    "link": "https://stockx.com/new balance-air max-high-53"
  },
  {
    "modello": "adidas skate low",
    "nome": "Adidas Skate Low",
    "sku": "ADSKLO0054",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/sneaker-54.jpg",
    "link": "https://stockx.com/adidas-skate-low-54"
  },
  {
    "modello": "adidas dunk zoom",
    "nome": "Adidas Dunk Zoom",
    "sku": "ADDUZO0055",
    "prezzo": "155",
    "immagine": "https://images.stockx.com/images/sneaker-55.jpg",
    "link": "https://stockx.com/adidas-dunk-zoom-55"
  },
  {
    "modello": "adidas dunk mid",
    "nome": "Adidas Dunk Mid",
    "sku": "ADDUMI0056",
    "prezzo": "156",
    "immagine": "https://images.stockx.com/images/sneaker-56.jpg",
    "link": "https://stockx.com/adidas-dunk-mid-56"
  },
  {
    "modello": "new balance gel-lyte flyknit",
    "nome": "New Balance Gel-Lyte Flyknit",
    "sku": "NEGEFL0057",
    "prezzo": "157",
    "immagine": "https://images.stockx.com/images/sneaker-57.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-flyknit-57"
  },
  {
    "modello": "puma superstar runner",
    "nome": "Puma Superstar Runner",
    "sku": "PUSURU0058",
    "prezzo": "158",
    "immagine": "https://images.stockx.com/images/sneaker-58.jpg",
    "link": "https://stockx.com/puma-superstar-runner-58"
  },
  {
    "modello": "new balance gel-lyte slide",
    "nome": "New Balance Gel-Lyte Slide",
    "sku": "NEGESL0059",
    "prezzo": "159",
    "immagine": "https://images.stockx.com/images/sneaker-59.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-slide-59"
  },
  {
    "modello": "asics superstar zoom",
    "nome": "Asics Superstar Zoom",
    "sku": "ASSUZO0060",
    "prezzo": "160",
    "immagine": "https://images.stockx.com/images/sneaker-60.jpg",
    "link": "https://stockx.com/asics-superstar-zoom-60"
  },
  {
    "modello": "new balance dunk retro",
    "nome": "New Balance Dunk Retro",
    "sku": "NEDURE0061",
    "prezzo": "161",
    "immagine": "https://images.stockx.com/images/sneaker-61.jpg",
    "link": "https://stockx.com/new balance-dunk-retro-61"
  },
  {
    "modello": "under armour dunk high",
    "nome": "Under Armour Dunk High",
    "sku": "UNDUHI0062",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/sneaker-62.jpg",
    "link": "https://stockx.com/under armour-dunk-high-62"
  },
  {
    "modello": "asics dunk retro",
    "nome": "Asics Dunk Retro",
    "sku": "ASDURE0063",
    "prezzo": "163",
    "immagine": "https://images.stockx.com/images/sneaker-63.jpg",
    "link": "https://stockx.com/asics-dunk-retro-63"
  },
  {
    "modello": "nike yeezy boost runner",
    "nome": "Nike Yeezy Boost Runner",
    "sku": "NIYERU0064",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/sneaker-64.jpg",
    "link": "https://stockx.com/nike-yeezy boost-runner-64"
  },
  {
    "modello": "reebok gel-lyte canvas",
    "nome": "Reebok Gel-Lyte Canvas",
    "sku": "REGECA0065",
    "prezzo": "165",
    "immagine": "https://images.stockx.com/images/sneaker-65.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-canvas-65"
  },
  {
    "modello": "new balance air max runner",
    "nome": "New Balance Air Max Runner",
    "sku": "NEAIRU0066",
    "prezzo": "166",
    "immagine": "https://images.stockx.com/images/sneaker-66.jpg",
    "link": "https://stockx.com/new balance-air max-runner-66"
  },
  {
    "modello": "adidas dunk flyknit",
    "nome": "Adidas Dunk Flyknit",
    "sku": "ADDUFL0067",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/sneaker-67.jpg",
    "link": "https://stockx.com/adidas-dunk-flyknit-67"
  },
  {
    "modello": "yeezy superstar boost",
    "nome": "Yeezy Superstar Boost",
    "sku": "YESUBO0068",
    "prezzo": "168",
    "immagine": "https://images.stockx.com/images/sneaker-68.jpg",
    "link": "https://stockx.com/yeezy-superstar-boost-68"
  },
  {
    "modello": "asics club c high",
    "nome": "Asics Club C High",
    "sku": "ASCLHI0069",
    "prezzo": "169",
    "immagine": "https://images.stockx.com/images/sneaker-69.jpg",
    "link": "https://stockx.com/asics-club c-high-69"
  },
  {
    "modello": "new balance dunk high",
    "nome": "New Balance Dunk High",
    "sku": "NEDUHI0070",
    "prezzo": "170",
    "immagine": "https://images.stockx.com/images/sneaker-70.jpg",
    "link": "https://stockx.com/new balance-dunk-high-70"
  },
  {
    "modello": "converse gel-lyte low",
    "nome": "Converse Gel-Lyte Low",
    "sku": "COGELO0071",
    "prezzo": "171",
    "immagine": "https://images.stockx.com/images/sneaker-71.jpg",
    "link": "https://stockx.com/converse-gel-lyte-low-71"
  },
  {
    "modello": "nike yeezy boost mid",
    "nome": "Nike Yeezy Boost Mid",
    "sku": "NIYEMI0072",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/sneaker-72.jpg",
    "link": "https://stockx.com/nike-yeezy boost-mid-72"
  },
  {
    "modello": "nike gel-lyte flyknit",
    "nome": "Nike Gel-Lyte Flyknit",
    "sku": "NIGEFL0073",
    "prezzo": "173",
    "immagine": "https://images.stockx.com/images/sneaker-73.jpg",
    "link": "https://stockx.com/nike-gel-lyte-flyknit-73"
  },
  {
    "modello": "nike react runner",
    "nome": "Nike React Runner",
    "sku": "NIRERU0074",
    "prezzo": "174",
    "immagine": "https://images.stockx.com/images/sneaker-74.jpg",
    "link": "https://stockx.com/nike-react-runner-74"
  },
  {
    "modello": "converse yeezy boost runner",
    "nome": "Converse Yeezy Boost Runner",
    "sku": "COYERU0075",
    "prezzo": "175",
    "immagine": "https://images.stockx.com/images/sneaker-75.jpg",
    "link": "https://stockx.com/converse-yeezy boost-runner-75"
  },
  {
    "modello": "under armour club c mid",
    "nome": "Under Armour Club C Mid",
    "sku": "UNCLMI0076",
    "prezzo": "176",
    "immagine": "https://images.stockx.com/images/sneaker-76.jpg",
    "link": "https://stockx.com/under armour-club c-mid-76"
  },
  {
    "modello": "jordan classic slide",
    "nome": "Jordan Classic Slide",
    "sku": "JOCLSL0077",
    "prezzo": "177",
    "immagine": "https://images.stockx.com/images/sneaker-77.jpg",
    "link": "https://stockx.com/jordan-classic-slide-77"
  },
  {
    "modello": "jordan yeezy boost zoom",
    "nome": "Jordan Yeezy Boost Zoom",
    "sku": "JOYEZO0078",
    "prezzo": "178",
    "immagine": "https://images.stockx.com/images/sneaker-78.jpg",
    "link": "https://stockx.com/jordan-yeezy boost-zoom-78"
  },
  {
    "modello": "adidas air max zoom",
    "nome": "Adidas Air Max Zoom",
    "sku": "ADAIZO0079",
    "prezzo": "179",
    "immagine": "https://images.stockx.com/images/sneaker-79.jpg",
    "link": "https://stockx.com/adidas-air max-zoom-79"
  },
  {
    "modello": "puma dunk high",
    "nome": "Puma Dunk High",
    "sku": "PUDUHI0080",
    "prezzo": "180",
    "immagine": "https://images.stockx.com/images/sneaker-80.jpg",
    "link": "https://stockx.com/puma-dunk-high-80"
  },
  {
    "modello": "yeezy react slide",
    "nome": "Yeezy React Slide",
    "sku": "YERESL0081",
    "prezzo": "181",
    "immagine": "https://images.stockx.com/images/sneaker-81.jpg",
    "link": "https://stockx.com/yeezy-react-slide-81"
  },
  {
    "modello": "nike yeezy boost slide",
    "nome": "Nike Yeezy Boost Slide",
    "sku": "NIYESL0082",
    "prezzo": "182",
    "immagine": "https://images.stockx.com/images/sneaker-82.jpg",
    "link": "https://stockx.com/nike-yeezy boost-slide-82"
  },
  {
    "modello": "under armour skate mid",
    "nome": "Under Armour Skate Mid",
    "sku": "UNSKMI0083",
    "prezzo": "183",
    "immagine": "https://images.stockx.com/images/sneaker-83.jpg",
    "link": "https://stockx.com/under armour-skate-mid-83"
  },
  {
    "modello": "yeezy air max boost",
    "nome": "Yeezy Air Max Boost",
    "sku": "YEAIBO0084",
    "prezzo": "184",
    "immagine": "https://images.stockx.com/images/sneaker-84.jpg",
    "link": "https://stockx.com/yeezy-air max-boost-84"
  },
  {
    "modello": "new balance air max runner",
    "nome": "New Balance Air Max Runner",
    "sku": "NEAIRU0085",
    "prezzo": "185",
    "immagine": "https://images.stockx.com/images/sneaker-85.jpg",
    "link": "https://stockx.com/new balance-air max-runner-85"
  },
  {
    "modello": "reebok superstar boost",
    "nome": "Reebok Superstar Boost",
    "sku": "RESUBO0086",
    "prezzo": "186",
    "immagine": "https://images.stockx.com/images/sneaker-86.jpg",
    "link": "https://stockx.com/reebok-superstar-boost-86"
  },
  {
    "modello": "under armour skate zoom",
    "nome": "Under Armour Skate Zoom",
    "sku": "UNSKZO0087",
    "prezzo": "187",
    "immagine": "https://images.stockx.com/images/sneaker-87.jpg",
    "link": "https://stockx.com/under armour-skate-zoom-87"
  },
  {
    "modello": "nike air max flyknit",
    "nome": "Nike Air Max Flyknit",
    "sku": "NIAIFL0088",
    "prezzo": "188",
    "immagine": "https://images.stockx.com/images/sneaker-88.jpg",
    "link": "https://stockx.com/nike-air max-flyknit-88"
  },
  {
    "modello": "jordan skate boost",
    "nome": "Jordan Skate Boost",
    "sku": "JOSKBO0089",
    "prezzo": "189",
    "immagine": "https://images.stockx.com/images/sneaker-89.jpg",
    "link": "https://stockx.com/jordan-skate-boost-89"
  },
  {
    "modello": "adidas skate canvas",
    "nome": "Adidas Skate Canvas",
    "sku": "ADSKCA0090",
    "prezzo": "190",
    "immagine": "https://images.stockx.com/images/sneaker-90.jpg",
    "link": "https://stockx.com/adidas-skate-canvas-90"
  },
  {
    "modello": "converse skate mid",
    "nome": "Converse Skate Mid",
    "sku": "COSKMI0091",
    "prezzo": "191",
    "immagine": "https://images.stockx.com/images/sneaker-91.jpg",
    "link": "https://stockx.com/converse-skate-mid-91"
  },
  {
    "modello": "jordan gel-lyte flyknit",
    "nome": "Jordan Gel-Lyte Flyknit",
    "sku": "JOGEFL0092",
    "prezzo": "192",
    "immagine": "https://images.stockx.com/images/sneaker-92.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-flyknit-92"
  },
  {
    "modello": "yeezy gel-lyte slide",
    "nome": "Yeezy Gel-Lyte Slide",
    "sku": "YEGESL0093",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/sneaker-93.jpg",
    "link": "https://stockx.com/yeezy-gel-lyte-slide-93"
  },
  {
    "modello": "new balance classic canvas",
    "nome": "New Balance Classic Canvas",
    "sku": "NECLCA0094",
    "prezzo": "194",
    "immagine": "https://images.stockx.com/images/sneaker-94.jpg",
    "link": "https://stockx.com/new balance-classic-canvas-94"
  },
  {
    "modello": "puma classic slide",
    "nome": "Puma Classic Slide",
    "sku": "PUCLSL0095",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/sneaker-95.jpg",
    "link": "https://stockx.com/puma-classic-slide-95"
  },
  {
    "modello": "jordan yeezy boost slide",
    "nome": "Jordan Yeezy Boost Slide",
    "sku": "JOYESL0096",
    "prezzo": "196",
    "immagine": "https://images.stockx.com/images/sneaker-96.jpg",
    "link": "https://stockx.com/jordan-yeezy boost-slide-96"
  },
  {
    "modello": "puma react slide",
    "nome": "Puma React Slide",
    "sku": "PURESL0097",
    "prezzo": "197",
    "immagine": "https://images.stockx.com/images/sneaker-97.jpg",
    "link": "https://stockx.com/puma-react-slide-97"
  },
  {
    "modello": "nike superstar mid",
    "nome": "Nike Superstar Mid",
    "sku": "NISUMI0098",
    "prezzo": "198",
    "immagine": "https://images.stockx.com/images/sneaker-98.jpg",
    "link": "https://stockx.com/nike-superstar-mid-98"
  },
  {
    "modello": "yeezy dunk low",
    "nome": "Yeezy Dunk Low",
    "sku": "YEDULO0099",
    "prezzo": "199",
    "immagine": "https://images.stockx.com/images/sneaker-99.jpg",
    "link": "https://stockx.com/yeezy-dunk-low-99"
  },
  {
    "modello": "reebok skate slide",
    "nome": "Reebok Skate Slide",
    "sku": "RESKSL0100",
    "prezzo": "200",
    "immagine": "https://images.stockx.com/images/sneaker-100.jpg",
    "link": "https://stockx.com/reebok-skate-slide-100"
  }
]
  ];

  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: scarpa.immagine },
      caption: messaggio
    },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;