import fs from 'fs';

const answer = fs.readFileSync('Input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => [
    Array.from(line.slice(0, line.length / 2)),
    Array.from(line.slice(line.length / 2))
  ])
  .map(([compartment1, compartment2]) =>
    compartment1.find(c => compartment2.includes(c)))
  .map(t => t.charCodeAt(0) - (t == t.toLowerCase() ? 96 : 38))
  .reduce((p1, p2) => p1 + p2, 0);

console.log(answer);
