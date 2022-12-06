import fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/);

const movesIndex = inputLines
  .findIndex(line => line.trim().length == 0);

const initialStacks = [
  '1ZPMHR',
  '2PCJB',
  '3SNHGLCD',
  '4FTMDQSRL',
  '5FSPQBTZM',
  '6TFSZBG',
  '7NRV',
  '8PGLTDVCM',
  '9WQNJFML'
];

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
