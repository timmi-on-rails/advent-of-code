import { getInputLines, getItemTypePriority } from './misc.mjs';

const answer = getInputLines()
  .map(line => [
    Array.from(line.slice(0, line.length / 2)),
    Array.from(line.slice(line.length / 2))
  ])
  .map(([compartment1, compartment2]) =>
    compartment1.find(c => compartment2.includes(c)))
  .map(getItemTypePriority)
  .reduce((sum, p) => sum + p, 0);

console.log(answer);
