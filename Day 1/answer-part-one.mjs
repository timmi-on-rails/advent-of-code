import { getInventoriesCalories } from './misc.mjs';

const answer = getInventoriesCalories()
  .reduce((max, calory) => calory > max ? calory : max);

console.log(answer);
