import { getInventoriesCalories } from './misc.mjs';

const answer = getInventoriesCalories()
  .sort((a, b) => a - b)
  .reverse()
  .slice(0, 3)
  .reduce((sum, calory) => sum + calory, 0);

console.log(answer);
