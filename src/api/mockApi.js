// Simulates a REST API with an artificial delay, so pages can demonstrate
// the same loading/error handling pattern taught in Lab 5 (useEffect + fetch)
// without needing the Laravel backend from Module 2 yet.
import {
  mockProducts,
  mockLocations,
  mockTransactions,
  mockInventory,
  mockReports,
  mockReorderRules,
  dashboardSummary,
} from '../data/mockData.js';

function mockRequest(data, { delay = 500, shouldFail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to reach the inventory service.'));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

export const api = {
  getProducts: () => mockRequest(mockProducts),
  getLocations: () => mockRequest(mockLocations),
  getTransactions: () => mockRequest(mockTransactions),
  getInventory: () => mockRequest(mockInventory),
  getReports: () => mockRequest(mockReports),
  getReorderRules: () => mockRequest(mockReorderRules),
  getDashboardSummary: () => mockRequest(dashboardSummary),
};
