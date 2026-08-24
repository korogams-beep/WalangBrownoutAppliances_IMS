import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import AsyncState from '../components/ui/AsyncState.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { useApiData } from '../hooks/useApiData.js';
import { api } from '../api/mockApi.js';
import styles from './Reports.module.css';

const REPORT_TABS = ['Reorder Alert', 'ABC Valuation', 'Expiring Stock (FIFO)', 'Movement Summary'];

export default function Reports() {
  const { data: reports, loading, error } = useApiData(api.getReports);
  const [activeTab, setActiveTab] = useState(REPORT_TABS[0]);

  return (
    <div>
      <PageHeader title="Reports" subtitle="Cross-check stock health against seasonal demand" />

      <div className={styles.tabs}>
        {REPORT_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tab} ${tab === activeTab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <AsyncState loading={loading} error={error} />
        {!loading && !error && (
          <DataTable
            rowKey="product"
            rows={reports}
            emptyMessage="No report rows for this filter yet."
            columns={[
              { key: 'product', header: 'Product' },
              { key: 'currentStock', header: 'Current Stock', align: 'right' },
              { key: 'seasonalAssumption', header: 'Seasonal Assumption' },
              { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
        )}
      </Card>
    </div>
  );
}
