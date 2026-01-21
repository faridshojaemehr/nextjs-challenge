export interface Item {
  id: number;
  title: string;
  description: string;
  value: number;
  category: string;
  timestamp: number;
  titleLower: string;
  descriptionLower: string;
  categoryLower: string;
}

export interface Stats {
  total: number;
  sum: string;
  average: string;
  max: string;
  min: string;
  categories: Record<string, number>;
}
