import fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/);

const movesIndex = inputLines
  .findIndex(line => line.trim().length == 0);

const initialStacks = inputLines
  .slice(0, movesIndex)
  .map(line => Array.from(line).reduce(
    (chunks, char, index) => (index % 4) == 0 ?
      chunks.concat(char) :
      [...chunks.slice(0, -1), chunks.at(-1) + char],
    []))
  .map(chunks => chunks.map(chunk => chunk.match(/\w/)?.at(0)))
  .reduce(
    (stacks, chunks) => chunks.map((chunk, i) =>
      (stacks[i] || []).concat(chunk)),
    [])
  .map(stack => stack.reverse().join(''))

const moves = inputLines
  .slice(movesIndex)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => line.match(/\d+/ig));

Array.prototype.apply = function (f) {
  return f(this);
}

const getFinalStacks = reverse => moves.reduce(
  (stacks, [count, from, to]) => stacks
    .map(stack =>
      stack.startsWith(from) ? stack.slice(0, -count) :
        stack.startsWith(to) ? stack.concat(stacks
          .find(s => s.startsWith(from))
          .slice(-count)
          .split('')
          .apply(p => reverse ? p.reverse() : p)
          .join('')) :
          stack),
  initialStacks);

const answerPart1 = getFinalStacks(true)
  .map(stack => stack.slice(-1))
  .join('');

console.log(answerPart1);

const answerPart2 = getFinalStacks(false)
  .map(stack => stack.slice(-1))
  .join('');

console.log(answerPart2);
