import { Item } from '../_types/state.interface';

const randomWords = [
  'innovative', 'advanced', 'premium', 'elegant', 'dynamic', 'powerful', 'smart', 'modern',
  'professional', 'creative', 'efficient', 'reliable', 'secure', 'flexible', 'robust', 'scalable',
  'responsive', 'interactive', 'intuitive', 'seamless', 'cutting-edge', 'next-gen', 'revolutionary',
  'quantum', 'neural', 'cognitive', 'distributed', 'parallel', 'cloud-based', 'edge-computing',
  'blockchain', 'decentralized', 'autonomous', 'adaptive', 'intelligent', 'learning', 'predictive'
];

const randomNouns = [
  'framework', 'platform', 'system', 'engine', 'interface', 'solution', 'application', 'service',
  'tool', 'utility', 'module', 'component', 'library', 'package', 'plugin', 'extension',
  'database', 'API', 'server', 'client', 'protocol', 'gateway', 'middleware', 'cache',
  'queue', 'stream', 'worker', 'cluster', 'node', 'network', 'mesh', 'fabric'
];

const randomAdjectives = [
  'fast', 'reliable', 'scalable', 'secure', 'efficient', 'lightweight', 'flexible', 'customizable',
  'modular', 'extensible', 'maintainable', 'testable', 'documentable', 'accessible', 'performant',
  'concurrent', 'asynchronous', 'fault-tolerant', 'self-healing', 'auto-scaling'
];

export const listLength = 500000;

export const generateHeavyData = (count: number = listLength, startId: number = 0): Item[] => {
  const getRandomWord = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return Array.from({ length: count }, (_, i) => {
    const title = `${getRandomWord(randomWords)} ${getRandomWord(randomNouns)}`;
    const description = `${getRandomWord(randomAdjectives)} ${getRandomWord(randomNouns)} for ${getRandomWord(randomNouns)} management with ${getRandomWord(randomAdjectives)} performance`;

    const category = ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)];

    return {
      id: i + startId,
      title,
      description,
      value: Math.random() * 1000,
      category,
      timestamp: Date.now() - Math.random() * 1000000,
      titleLower: title.toLowerCase(),
      descriptionLower: description.toLowerCase(),
      categoryLower: category.toLowerCase(),
    };
  });
};
