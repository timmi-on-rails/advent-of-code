import fs from 'fs';

const decodedStrategy = fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => line.split(/\s+/))
  .map(([opponent, you]) => [
    opponent.charCodeAt(0) - 64,
    you.charCodeAt(0) - 87
  ]);

const answerPart1 = decodedStrategy
  .map(([opponent, you]) => [0, 6, 3, 0, 6].at(opponent - you + 2) + you)
  .reduce((sum, score) => sum + score, 0);

console.log(answerPart1);

const answerPart2 = decodedStrategy
  .map(([opponent, you]) => [
    opponent,
    you == 1 ? [3, 1, 2].at(opponent - 1) :
      you == 2 ? opponent :
        [2, 3, 1].at(opponent - 1)
  ])
  .map(([opponent, you]) => [0, 6, 3, 0, 6].at(opponent - you + 2) + you)
  .reduce((sum, score) => sum + score, 0);

console.log(answerPart2);
