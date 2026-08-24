import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import KPICard from '../components/ui/KPICard.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import AsyncState from '../components/ui/AsyncState.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { ProductIcon, ReportIcon, AlertIcon } from '../components/ui/Icons.jsx';
import { useApiData } from '../hooks/useApiData.js';
import { api } from '../api/mockApi.js';
import { fulfillmentStatus } from '../data/mockData.js';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { data: summary, loading: loadingSummary } = useApiData(api.getDashboardSummary);
  const { data: inventory, loading: loadingInventory, error } = useApiData(api.getInventory);

  const lowStock = (inventory || []).filter((item) => fulfillmentStatus(item) !== 'OK');

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of WalangBrownout Inventory" onSortClick={() => {}} />

      {loadingSummary ? (
        <AsyncState loading />
      ) : (
        <div className={styles.kpiRow}>
          <KPICard icon={ProductIcon} value={summary.totalProducts} label="Total Products" caption="All items in inventory" />
          <KPICard icon={ReportIcon} value={summary.totalStock} label="Total Stock" caption="Total quantity" />
          <KPICard icon={AlertIcon} value={summary.lowStockItems} label="Low Stock Items" caption="Needs attention" />
        </div>
      )}

      <div className={styles.grid}>
        <Card title="Stock Overview">
          <AsyncState loading={loadingInventory} error={error} />
          {!loadingInventory && !error && (
            <DataTable
              rowKey="productId"
              rows={inventory}
              columns={[
                { key: 'productId', header: 'Product ID' },
                { key: 'name', header: 'Product Name' },
                { key: 'qtyOnHand', header: 'Quantity', align: 'right' },
                {
                  key: 'status',
                  header: 'Stock',
                  render: (row) => <StatusBadge status={fulfillmentStatus(row)} />,
                },
              ]}
            />
          )}
        </Card>

        <Card
          title="Low Stock Alerts"
          action={
            <Link to="/alerts" className={styles.viewAll}>
              View All
            </Link>
          }
        >
          <AsyncState loading={loadingInventory} error={error} />
          {!loadingInventory && !error && (
            <ul className={styles.alertList}>
              {lowStock.map((item) => (
                <li key={item.productId} className={styles.alertRow}>
                  <span>{item.name}</span>
                  <span className={styles.alertQty}>{item.qtyOnHand} Left</span>
                </li>
              ))}
              {lowStock.length === 0 && <p className={styles.empty}>Everything is within safe stock levels.</p>}
            </ul>
          )}
        </Card>
      </div>

      {!loadingSummary && (
        <Card className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Inventory Control Dashboard</h3>
          <div className={styles.summaryRow}>
            <div>
              <p className={styles.summaryValue}>{summary.totalSkus}</p>
              <p className={styles.summaryLabel}>Total SKUs</p>
            </div>
            <div>
              <p className={styles.summaryValue}>₱{summary.totalInventoryValue.toLocaleString()}</p>
              <p className={styles.summaryLabel}>Total Inventory Value</p>
            </div>
            <div>
              <p className={styles.summaryValue}>{summary.expiringBatches30d}</p>
              <p className={styles.summaryLabel}>Expiring Batches in 30 Days</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
