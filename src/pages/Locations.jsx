import { useMemo, useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import AsyncState from '../components/ui/AsyncState.jsx';
import Button from '../components/ui/Button.jsx';
import { PlusIcon } from '../components/ui/Icons.jsx';
import { useApiData } from '../hooks/useApiData.js';
import { api } from '../api/mockApi.js';
import styles from './ListPage.module.css';

export default function Locations() {
  const { data: locations, loading, error } = useApiData(api.getLocations);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!locations) return [];
    const q = query.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter((l) => l.id.toLowerCase().includes(q) || l.warehouse.toLowerCase().includes(q));
  }, [locations, query]);

  return (
    <div>
      <PageHeader
        title="Location"
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search location"
        onSortClick={() => {}}
      />

      <Card>
        <AsyncState loading={loading} error={error} />
        {!loading && !error && (
          <DataTable
            rowKey="id"
            rows={filtered}
            columns={[
              { key: 'id', header: 'Location ID' },
              { key: 'warehouse', header: 'Warehouse Name' },
              { key: 'binCode', header: 'Bin Code' },
            ]}
          />
        )}
      </Card>

      <div className={styles.footerAction}>
        {/* Full Add Location screen wasn't in the wireframe set — wire this to a
           form the same way ProductForm is wired once that screen is designed. */}
        <Button variant="accent" icon={PlusIcon} onClick={() => console.log('Add location')}>
          Add Location
        </Button>
      </div>
    </div>
  );
}
