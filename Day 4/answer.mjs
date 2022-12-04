import fs from 'fs';

const pairsOfSectionRanges = fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => line
    .split(',')
    .map(range => range.split('-').map(Number)));

const answerPart1 = pairsOfSectionRanges
  .filter(([[s1, e1], [s2, e2]]) =>
    s1 == s2 ||
    e1 == e2 ||
    (e1 - e2) / (s2 - s1) > 0)
  .length;

console.log(answerPart1);

const answerPart2 = pairsOfSectionRanges
  .filter(([[s1, e1], [s2, e2]]) =>
    s1 <= e2 && e1 >= s2)
  .length;

console.log(answerPart2);
