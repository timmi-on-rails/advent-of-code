import fs from 'fs';

export const decodeStrategy = () => fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => line.split(/\s+/))
  .map(([opponent, you]) => [
    opponent.charCodeAt(0) - 64,
    you.charCodeAt(0) - 87
  ]);
