import fs from 'fs';

export const inputLines = fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0);

export const getItemTypePriority = (char) =>
  char.charCodeAt(0) - (char == char.toLowerCase() ? 96 : 38);

const answerPart1 = inputLines
  .map(line => [
    Array.from(line.slice(0, line.length / 2)),
    Array.from(line.slice(line.length / 2))
  ])
  .map(([compartment1, compartment2]) =>
    compartment1.find(c => compartment2.includes(c)))
  .map(getItemTypePriority)
  .reduce((sum, p) => sum + p, 0);

console.log(answerPart1);

const answerPart2 = inputLines
  .reduce(
    (chunks, line, index) => (index % 3) == 0 ?
      [...chunks, [line]] :
      [...chunks.slice(0, -1), chunks.at(-1).concat(line)],
    [])
  .map(chunk => Array.from(chunk[0]).find(ch =>
    !chunk.slice(1).find(line => !line.includes(ch))))
  .map(getItemTypePriority)
  .reduce((sum, p) => sum + p, 0);

console.log(answerPart2);
