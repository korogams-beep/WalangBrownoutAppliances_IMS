import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import AsyncState from '../components/ui/AsyncState.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Button from '../components/ui/Button.jsx';
import { useApiData } from '../hooks/useApiData.js';
import { api } from '../api/mockApi.js';
import styles from './Transactions.module.css';

export default function Transactions() {
  const navigate = useNavigate();
  const { data: transactions, loading, error } = useApiData(api.getTransactions);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!transactions) return [];
    const q = query.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) => t.id.toLowerCase().includes(q) || t.productId.toLowerCase().includes(q));
  }, [transactions, query]);

  return (
    <div>
      <PageHeader
        title="Transactions"
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search transaction"
        onSortClick={() => {}}
      />

      <Card>
        <AsyncState loading={loading} error={error} />
        {!loading && !error && (
          <DataTable
            rowKey="id"
            rows={filtered}
            columns={[
              { key: 'id', header: 'Transaction ID' },
              { key: 'productId', header: 'Product ID' },
              { key: 'type', header: 'Type', render: (r) => <StatusBadge status={r.type} /> },
              { key: 'qtyChanged', header: 'Quantity Changed', align: 'right' },
              { key: 'dateTime', header: 'Date/Time' },
            ]}
          />
        )}
      </Card>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => navigate('/transactions/receive')}>
          Receive New Batch
        </Button>
        <Button variant="accent" onClick={() => navigate('/transactions/new')}>
          New Transaction
        </Button>
      </div>
    </div>
  );
}
