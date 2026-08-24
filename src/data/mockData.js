// Static mock data standing in for the Laravel/Eloquent backend (Module 2),
// which is out of scope for this frontend-only midterm build.

export const mockProducts = [
  { id: 'PID-001', name: 'Window AC Unit 1HP', category: 'Group A (AC)', unitPrice: 350, perishable: false, qtyOnHand: 12 },
  { id: 'PID-002', name: 'Smart Thermostat', category: 'Group A (AC)', unitPrice: 150, perishable: false, qtyOnHand: 25 },
  { id: 'PID-003', name: 'HEPA Air Purifier', category: 'Group B (Purifier)', unitPrice: 200, perishable: false, qtyOnHand: 3 },
  { id: 'PID-004', name: 'Carbon Air Filter 16x20', category: 'Group C (Filter)', unitPrice: 25, perishable: true, qtyOnHand: 0 },
  { id: 'PID-005', name: 'Standard Air Filter 16x20', category: 'Group C (Filter)', unitPrice: 15, perishable: true, qtyOnHand: 40 },
  { id: 'PID-006', name: 'Portable AC Unit 0.75HP', category: 'Group A (AC)', unitPrice: 280, perishable: false, qtyOnHand: 6 },
];

export const mockLocations = [
  { id: 'LOC-A1', warehouse: 'Main Warehouse', binCode: 'A-01-01' },
  { id: 'LOC-A2', warehouse: 'Main Warehouse', binCode: 'A-02-03' },
  { id: 'LOC-B1', warehouse: 'Main Warehouse', binCode: 'B-01-01' },
  { id: 'LOC-C1', warehouse: 'Cold Storage', binCode: 'C-01-01' },
];

export const mockTransactions = [
  { id: 'T-001', productId: 'PID-001', type: 'Sale', qtyChanged: -2, dateTime: '2026-08-18 10:30 AM' },
  { id: 'T-002', productId: 'PID-004', type: 'Sale', qtyChanged: -10, dateTime: '2026-08-17 11:05 AM' },
  { id: 'T-003', productId: 'PID-003', type: 'Return', qtyChanged: 1, dateTime: '2026-08-15 09:40 AM' },
  { id: 'T-004', productId: 'PID-001', type: 'Damage', qtyChanged: -1, dateTime: '2026-08-15 08:50 AM' },
];

// Inventory / ATP figures + reorder point, feeding Alerts + Dashboard
export const mockInventory = [
  { productId: 'PID-001', name: 'Window AC Unit 1HP', qtyOnHand: 12, qtyCommitted: 4, rop: 10 },
  { productId: 'PID-002', name: 'Smart Thermostat', qtyOnHand: 25, qtyCommitted: 6, rop: 12 },
  { productId: 'PID-003', name: 'HEPA Air Purifier', qtyOnHand: 3, qtyCommitted: 1, rop: 8 },
  { productId: 'PID-004', name: 'Carbon Air Filter 16x20', qtyOnHand: 0, qtyCommitted: 0, rop: 15 },
  { productId: 'PID-005', name: 'Standard Air Filter 16x20', qtyOnHand: 40, qtyCommitted: 5, rop: 20 },
];

export function fulfillmentStatus(item) {
  const atp = item.qtyOnHand - item.qtyCommitted;
  if (item.qtyOnHand === 0) return 'Out of Stock';
  if (atp <= 0) return 'Low Stock';
  if (item.qtyOnHand <= item.rop) return 'Reorder Alert';
  return 'OK';
}

export const mockReports = [
  { product: 'Portable AC Units', currentStock: 15, seasonalAssumption: '25 Days (Approx)', status: 'Below RoP' },
  { product: 'Carbon Air Filter 16x20', currentStock: 0, seasonalAssumption: 'Peak Season (AC 3-5)', status: 'Out of Stock' },
  { product: 'HEPA Air Purifier', currentStock: 3, seasonalAssumption: '12 Days (Approx)', status: 'Below RoP' },
];

export const mockReorderRules = [
  { id: 'ROZ-001', productId: 'PID-001', seasonStart: 'March', seasonEnd: 'May', leadTimeDays: 7, safetyStock: 10, rop: 45 },
  { id: 'ROZ-002', productId: 'PID-004', seasonStart: 'Feb', seasonEnd: 'June', leadTimeDays: 5, safetyStock: 15, rop: 40 },
];

export const dashboardSummary = {
  totalProducts: 128,
  totalStock: 345,
  lowStockItems: 47,
  totalSkus: 6,
  totalInventoryValue: 89500,
  expiringBatches30d: 3,
};
