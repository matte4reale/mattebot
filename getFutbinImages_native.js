const https = require('https');
const fs = require('fs');

const playerIds = [231747, 192985, 158023]; // Mbappé, De Bruyne, Messi
const versions = ["", "-totw", "-tots", "-ucl", "-futbirthday", "-shapeshifter"]; // Estendibile

const baseUrl = "https://cdn.futbin.com/content/fifa24/img/cards/players";

function checkImage(url) {
  return new Promise((resolve) => {
    https
      .request(url, { method: 'HEAD' }, (res) => {
        resolve(res.statusCode === 200 ? url : null);
      })
      .on('error', () => resolve(null))
      .end();
  });
}

(async () => {
  const result = {};

  for (const id of playerIds) {
    result[id] = [];

    for (const suffix of versions) {
      const url = `${baseUrl}/${id}${suffix}.png`;
      const valid = await checkImage(url);
      if (valid) {
        console.log(`✅ ${valid}`);
        result[id].push(valid);
      } else {
        console.log(`❌ ${url}`);
      }
    }
  }

  fs.writeFileSync('futbin_cards_native.json', JSON.stringify(result, null, 2));
  console.log('✅ File salvato: futbin_cards_native.json');
})();
