import { decodeStrategy } from './misc.mjs';

const answer = decodeStrategy()
  .map(([opponent, you]) => [
    opponent,
    you == 1 ? [3, 1, 2].at(opponent - 1) :
      you == 2 ? opponent :
        [2, 3, 1].at(opponent - 1)
  ])
  .map(([opponent, you]) => [0, 6, 3, 0, 6].at(opponent - you + 2) + you)
  .reduce((sum, score) => sum + score, 0);

console.log(answer);
