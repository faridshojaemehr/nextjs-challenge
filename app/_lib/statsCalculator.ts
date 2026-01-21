import { Item, Stats } from '../_types';

export const calculateStats = (items: Item[]): Stats => {
  let sum = 0;
  let avgValue = 0;
  let maxValue = 0;
  let minValue = Infinity;
  let categoryCount: Record<string, number> = {};

  for (let item of items) {
    sum += item.value;
    maxValue = Math.max(maxValue, item.value);
    minValue = Math.min(minValue, item.value);
    categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
  }

  avgValue = items.length > 0 ? sum / items.length : 0;

  return {
    total: items.length,
    sum: sum.toFixed(2),
    average: avgValue.toFixed(2),
    max: maxValue.toFixed(2),
    min: minValue === Infinity ? '0' : minValue.toFixed(2),
    categories: categoryCount,
  };
};
