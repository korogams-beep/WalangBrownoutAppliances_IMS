import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import AsyncState from '../components/ui/AsyncState.jsx';
import Button from '../components/ui/Button.jsx';
import { useApiData } from '../hooks/useApiData.js';
import { api } from '../api/mockApi.js';
import styles from './Settings.module.css';

export default function Settings() {
  const { data: rules, loading, error } = useApiData(api.getReorderRules);
  const [editing, setEditing] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    // Persisting rule edits to the backend is Module 2 (Laravel/Eloquent) scope.
    console.log('Save reorder rule');
    setEditing(false);
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Reorder rules"
        action={
          <Button variant={editing ? 'secondary' : 'accent'} onClick={() => setEditing((v) => !v)}>
            {editing ? 'Cancel' : 'Edit'}
          </Button>
        }
      />

      <Card>
        <AsyncState loading={loading} error={error} />
        {!loading && !error && (
          <DataTable
            rowKey="id"
            rows={rules}
            columns={[
              { key: 'id', header: 'Reorder Rule ID' },
              { key: 'productId', header: 'Product ID' },
              { key: 'seasonStart', header: 'Season Start' },
              { key: 'seasonEnd', header: 'Season End' },
              { key: 'leadTimeDays', header: 'Lead Time (Days)', align: 'right' },
              { key: 'safetyStock', header: 'Safety Stock', align: 'right' },
              { key: 'rop', header: 'Reorder Point', align: 'right' },
            ]}
          />
        )}
      </Card>

      {editing && (
        <form onSubmit={handleSave} className={styles.editForm}>
          <input className={styles.input} placeholder="Product ID (e.g. PID-001)" />
          <input className={styles.input} placeholder="Safety stock quantity" type="number" />
          <div className={styles.editActions}>
            <Button type="submit" variant="accent">
              Save Reorder Rule
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
