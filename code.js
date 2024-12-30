const fs = require('fs');
function calculateSecret(points, k) {
  let secret = 0;
  for (let i = 0; i < k; i++) {
    let term = points[i][1];
    for (let j = 0; j < k; j++) {
      if (i !== j) {
        term *= (points[j][0] / (points[j][0] - points[i][0]));
      }
    }
    secret += term;
  }
  return secret;
}

function main() {
  const data = JSON.parse(fs.readFileSync('input.json', 'utf8'));

  console.log('Data:', data);

  const n = data.keys.n;
  const k = data.keys.k;

  console.log('n:', n);
  console.log('k:', k);

  const points = [];
  for (let i = 1; i <= n; i++) {
    const key = `${i}`;
    console.log('Key:', key);

    if (!data[key]) {
      console.error(`Missing data for key ${key}`);
      return;
    }

    const base = parseInt(data[key].base);
    const value = parseInt(data[key].value, base);
    points.push([i, value]);
  }

  console.log('Points:', points);

  const secret = calculateSecret(points, k);
  console.log('Secret C:', secret);
}

main();
