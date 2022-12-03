import { getInputLines, getItemTypePriority } from './misc.mjs';

const answer = getInputLines()
  .reduce(
    (chunks, line, index) => (index % 3) == 0 ?
      [...chunks, [line]] :
      [...chunks.slice(0, -1), chunks.at(-1).concat(line)],
    [])
  .map(chunk => Array.from(chunk[0]).find(ch =>
    !chunk.slice(1).find(line => !line.includes(ch))))
  .map(getItemTypePriority)
  .reduce((sum, p) => sum + p, 0);

console.log(answer);
