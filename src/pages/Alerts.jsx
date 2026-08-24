import { useMemo, useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import AsyncState from '../components/ui/AsyncState.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { useApiData } from '../hooks/useApiData.js';
import { api } from '../api/mockApi.js';
import { fulfillmentStatus } from '../data/mockData.js';
import styles from './Reports.module.css';

const FILTERS = ['All Alerts', 'Low Stock', 'Out of Stock'];

export default function Alerts() {
  const { data: inventory, loading, error } = useApiData(api.getInventory);
  const [filter, setFilter] = useState(FILTERS[0]);

  const rows = useMemo(() => {
    if (!inventory) return [];
    return inventory
      .map((item) => ({ ...item, status: fulfillmentStatus(item), atp: item.qtyOnHand - item.qtyCommitted }))
      .filter((item) => {
        if (filter === 'Low Stock') return item.status === 'Low Stock' || item.status === 'Reorder Alert';
        if (filter === 'Out of Stock') return item.status === 'Out of Stock';
        return true;
      });
  }, [inventory, filter]);

  return (
    <div>
      <PageHeader title="Alerts" onSortClick={() => {}} />

      <div className={styles.tabs}>
        {FILTERS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tab} ${tab === filter ? styles.tabActive : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <AsyncState loading={loading} error={error} />
        {!loading && !error && (
          <DataTable
            rowKey="productId"
            rows={rows}
            emptyMessage="No alerts in this filter."
            columns={[
              { key: 'productId', header: 'Product ID' },
              { key: 'name', header: 'Product Name' },
              { key: 'qtyOnHand', header: 'Quantity on Hand', align: 'right' },
              { key: 'qtyCommitted', header: 'Quantity Committed', align: 'right' },
              { key: 'atp', header: 'Available to Promise (ATP)', align: 'right' },
              { key: 'rop', header: 'Current ROP', align: 'right' },
              { key: 'status', header: 'Fulfillment Status', render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
        )}
      </Card>
    </div>
  );
}
