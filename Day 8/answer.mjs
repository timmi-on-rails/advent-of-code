import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');

const columnCount = input.match(/\r?\n/).index;

const trees = input.replace(/[^0-9]/g, '');

const getLeft = (trees, index) =>
  (index % columnCount == 0) ? [] :
    [trees[index - 1]].concat(getLeft(trees, index - 1));

const getRight = (trees, index) =>
  ((index + 1) % columnCount == 0) ? [] :
    [trees[index + 1]].concat(getRight(trees, index + 1));

const getTop = (trees, index) =>
  ((index - columnCount) < 0) ? [] :
    [trees[index - columnCount]].concat(getTop(trees, index - columnCount));

const getBottom = (trees, index) =>
  ((index + columnCount) >= trees.length) ? [] :
    [trees[index + columnCount]].concat(getBottom(trees, index + columnCount));

const isVisible = (height, trees2) =>
  trees2.length == 0 || trees2.every(h => Number(h) < Number(height));

const answerPart1 = [...Array(trees.length).keys()]
  .filter(index =>
    isVisible(trees[index], getLeft(trees, index)) ||
    isVisible(trees[index], getRight(trees, index)) ||
    isVisible(trees[index], getTop(trees, index)) ||
    isVisible(trees[index], getBottom(trees, index)))
  .length;

console.log(answerPart1);

const scenicScorePartial = (height, trees2) => {
  const i = trees2.findIndex(h => Number(h) >= Number(height));
  return i < 0 ? trees2.length : i + 1;
}

const answerPart2 = [...Array(trees.length).keys()]
  .map(index =>
    scenicScorePartial(trees[index], getLeft(trees, index)) *
    scenicScorePartial(trees[index], getRight(trees, index)) *
    scenicScorePartial(trees[index], getTop(trees, index)) *
    scenicScorePartial(trees[index], getBottom(trees, index)))
  .sort((a, b) => a - b)
  .reverse()
  .at(0);

console.log(answerPart2);
