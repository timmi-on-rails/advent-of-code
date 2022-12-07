import fs from 'fs';

const cd = (currentDirArr, dir) => dir
  .split('/').filter(d => d.length > 0)
  .reduce(
    (dirs, d) => d == '..' ? dirs.slice(0, -1) : dirs.concat(d),
    dir.startsWith('/') ? [] : currentDirArr);

// TODO: increase readability :)
const listings = fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .reduce(([currentDirArr, listings], line) =>
    line.startsWith('$ cd') ? [cd(currentDirArr, line.slice(5)), listings] :
      line.startsWith('$ ls') ? [currentDirArr, listings.concat({
        dir: currentDirArr,
        subDirs: [],
        files: []
      })] :
        line.startsWith('dir') ? [currentDirArr, [...listings.slice(0, -1), Object.assign(listings.at(-1), { subDirs: listings.at(-1).subDirs.concat(line.slice(4)) })]] :
          [currentDirArr, [...listings.slice(0, -1), Object.assign(listings.at(-1), { files: [...listings.at(-1).files, line.split(' ')] })]],
    [[], []])
  .at(1);

const dirs = listings
  .reduce(
    (dirs, listing) => Object.assign(dirs, {
      ['/' + listing.dir.join('/')]: {
        subDirs: listing.subDirs,
        files: listing.files
      }
    }),
    {});

const getDirSize = (dirs, dir) =>
  dirs[dir].files.reduce((sum, file) => sum + Number(file[0]), 0) +
  dirs[dir].subDirs.reduce((sum, subDir) => sum + getDirSize(dirs, dir.replace(/\/+$/, '') + '/' + subDir), 0);

const answerPart1 = Object.keys(dirs)
  .map(dir => getDirSize(dirs, dir))
  .filter(size => size <= 100000)
  .reduce((sum, size) => sum + size, 0);

console.log(answerPart1);

const spaceToFreeUp = 30000000 - 70000000 + getDirSize(dirs, '/');

const answerPart2 = Object.keys(dirs)
  .map(dir => getDirSize(dirs, dir))
  .filter(size => size >= spaceToFreeUp)
  .sort((a, b) => a - b)
  .at(0);

console.log(answerPart2)
