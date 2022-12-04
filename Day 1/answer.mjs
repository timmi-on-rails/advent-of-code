import fs from 'fs';

const inventoriesCalories = fs.readFileSync('input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .reduce(
    (inventories, line) => line.length == 0 ?
      [...inventories, []] :
      [
        ...inventories.slice(0, -1),
        inventories.at(-1).concat(Number(line))
      ],
    [[]])
  .filter(inventory => inventory.length > 0)
  .map(inventory => inventory.reduce((sum, calory) => sum + calory, 0));

const answerPart1 = inventoriesCalories
  .reduce((max, calory) => calory > max ? calory : max);

console.log(answerPart1);

const answerPart2 = inventoriesCalories
  .sort((a, b) => a - b)
  .reverse()
  .slice(0, 3)
  .reduce((sum, calory) => sum + calory, 0);

console.log(answerPart2);
