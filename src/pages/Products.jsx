import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import AsyncState from '../components/ui/AsyncState.jsx';
import Button from '../components/ui/Button.jsx';
import { PlusIcon } from '../components/ui/Icons.jsx';
import { useApiData } from '../hooks/useApiData.js';
import { api } from '../api/mockApi.js';
import styles from './ListPage.module.css';

export default function Products() {
  const navigate = useNavigate();
  const { data: products, loading, error } = useApiData(api.getProducts);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div>
      <PageHeader
        title="Product"
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search by name or id"
        onSortClick={() => {}}
      />

      <Card>
        <AsyncState loading={loading} error={error} />
        {!loading && !error && (
          <DataTable
            rowKey="id"
            rows={filtered}
            columns={[
              { key: 'id', header: 'ID' },
              { key: 'name', header: 'Product Name' },
              { key: 'category', header: 'Category' },
              { key: 'unitPrice', header: 'Unit Price', align: 'right', render: (r) => `₱${r.unitPrice}` },
              { key: 'perishable', header: 'Is Perishable?', render: (r) => (r.perishable ? 'TRUE' : 'FALSE') },
            ]}
          />
        )}
      </Card>

      <div className={styles.footerAction}>
        <Button variant="accent" icon={PlusIcon} onClick={() => navigate('/products/new')}>
          Add New Product
        </Button>
      </div>
    </div>
  );
}
