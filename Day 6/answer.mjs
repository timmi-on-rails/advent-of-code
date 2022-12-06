import fs from 'fs';

const getStartIndex = markerLength => Array.from(fs.readFileSync('input.txt', 'utf-8'))
  .reduce(
    (windows, char) => windows.concat(windows.at(-1).slice(-markerLength + 1) + char),
    [''])
  .findIndex(window => new Set(Array.from(window)).size == markerLength);

const answerPart1 = getStartIndex(4);

console.log(answerPart1);

const answerPart2 = getStartIndex(14);

console.log(answerPart2);
