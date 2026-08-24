import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPanel from '../components/layout/FormPanel.jsx';
import FormField from '../components/ui/FormField.jsx';
import Button from '../components/ui/Button.jsx';

const initialForm = {
  product: '',
  batch: '',
  type: 'Sale',
  qtyChanged: '',
  transactionDate: '',
};

export default function RecordTransaction() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Record transaction', form);
    navigate('/transactions');
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormPanel
        title="TRANSACTIONS — NEW TRANSACTION"
        closeTo="/transactions"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => navigate('/transactions')}>
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Record Transaction
            </Button>
          </>
        }
      >
        <FormField label="Product">
          <input value={form.product} onChange={(e) => update('product', e.target.value)} required />
        </FormField>
        <FormField label="Batch">
          <input value={form.batch} onChange={(e) => update('batch', e.target.value)} />
        </FormField>

        <FormField label="Transaction Type">
          <select value={form.type} onChange={(e) => update('type', e.target.value)}>
            <option>Sale</option>
            <option>Return</option>
            <option>Damage</option>
            <option>Receive</option>
          </select>
        </FormField>
        <FormField label="Quantity Changed">
          <input
            type="number"
            value={form.qtyChanged}
            onChange={(e) => update('qtyChanged', e.target.value)}
            required
          />
        </FormField>

        <FormField label="Transaction Date">
          <input
            type="date"
            value={form.transactionDate}
            onChange={(e) => update('transactionDate', e.target.value)}
          />
        </FormField>
      </FormPanel>
    </form>
  );
}
