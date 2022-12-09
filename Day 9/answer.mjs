import fs from 'fs';

const getDirection = char =>
  char == 'L' ? [-1, 0] :
    char == 'R' ? [1, 0] :
      char == 'U' ? [0, -1] :
        char == 'D' ? [0, 1] :
          [0, 0];

const isTouching = (posA, posB) =>
  Math.abs(posA[0] - posB[0]) <= 1 &&
  Math.abs(posA[1] - posB[1]) <= 1;

const moveTail = (head, tail) =>
  [
    tail[0] + ((head[0] != tail[0]) ? Math.abs(head[0] - tail[0]) / (head[0] - tail[0]) : 0),
    tail[1] + ((head[1] != tail[1]) ? Math.abs(head[1] - tail[1]) / (head[1] - tail[1]) : 0)
  ]

const getTailVisitCount = tailLength => fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .flatMap(line => Array(Number(line.slice(2))).fill(getDirection(line.slice(0, 1))))
  .reduce(
    (trace, direction) => [
      ...trace,
      trace.at(-1).slice(1).reduce(
        (rope, tail) => isTouching(rope.at(-1), tail) ?
          [...rope, tail] : [...rope, moveTail(rope.at(-1), tail)],
        [[trace.at(-1)[0][0] + direction[0], trace.at(-1)[0][1] + direction[1]]])
    ],
    [[[0, 0], ...Array(tailLength).fill([0, 0])]])
  .reduce(
    (visited, rope) =>
    (visited.find(tPos => tPos[0] == rope.at(-1)[0] && tPos[1] == rope.at(-1)[1]) ?
      visited :
      [...visited, rope.at(-1)]),
    [])
  .length;

const answerPart1 = getTailVisitCount(1);

console.log(answerPart1);

const answerPart2 = getTailVisitCount(9);

console.log(answerPart2);
