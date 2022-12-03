import fs from 'fs';

export const getInventoriesCalories = () => fs.readFileSync('input.txt', 'utf-8')
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
