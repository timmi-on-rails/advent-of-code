import fs from 'fs';

export const getInputLines = () => fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0);

export const getItemTypePriority = (char) =>
  char.charCodeAt(0) - (char == char.toLowerCase() ? 96 : 38);
