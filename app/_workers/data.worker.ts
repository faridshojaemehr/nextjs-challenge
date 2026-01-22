import { generateHeavyData } from "../_lib/dataGenerator";

self.onmessage = (event) => {
  if (event.data.type === 'START') {
    try {
      const data = generateHeavyData(event.data.count || 500000);
      self.postMessage({ type: 'SUCCESS', data });
    } catch (error) {
      self.postMessage({ type: 'ERROR', error });
    }
  }
};
