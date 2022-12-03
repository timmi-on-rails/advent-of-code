import { decodeStrategy } from './misc.mjs';

const answer = decodeStrategy()
  .map(([opponent, you]) => [0, 6, 3, 0, 6].at(opponent - you + 2) + you)
  .reduce((sum, score) => sum + score, 0);

console.log(answer);
