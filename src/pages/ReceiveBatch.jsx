import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPanel from '../components/layout/FormPanel.jsx';
import FormField from '../components/ui/FormField.jsx';
import Button from '../components/ui/Button.jsx';

const initialForm = {
  batchId: '',
  productId: '',
  location: '',
  qtyReceived: '',
  dateReceived: '',
  expiryDate: '',
};

export default function ReceiveBatch() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Save batch', form);
    navigate('/transactions');
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormPanel
        title="TRANSACTIONS — RECEIVE NEW BATCH"
        closeTo="/transactions"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => navigate('/transactions')}>
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Save Batch
            </Button>
          </>
        }
      >
        <FormField label="Batch ID">
          <input value={form.batchId} onChange={(e) => update('batchId', e.target.value)} required />
        </FormField>
        <FormField label="Product ID">
          <input value={form.productId} onChange={(e) => update('productId', e.target.value)} required />
        </FormField>

        <FormField label="Location">
          <input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="LOC-A1" />
        </FormField>
        <FormField label="Quantity Received">
          <input
            type="number"
            min="0"
            value={form.qtyReceived}
            onChange={(e) => update('qtyReceived', e.target.value)}
            required
          />
        </FormField>

        <FormField label="Date Received">
          <input type="date" value={form.dateReceived} onChange={(e) => update('dateReceived', e.target.value)} />
        </FormField>
        <FormField label="Expiry Date">
          <input type="date" value={form.expiryDate} onChange={(e) => update('expiryDate', e.target.value)} />
        </FormField>
      </FormPanel>
    </form>
  );
}
