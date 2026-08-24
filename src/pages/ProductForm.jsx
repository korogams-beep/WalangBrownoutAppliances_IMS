import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPanel from '../components/layout/FormPanel.jsx';
import FormField from '../components/ui/FormField.jsx';
import Button from '../components/ui/Button.jsx';

const initialForm = {
  productId: 'APP-1001',
  name: '',
  category: '',
  unitPrice: '',
  startingQty: 0,
  perishable: 'No',
};

export default function ProductForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Persisting to the backend is Module 2 (Laravel/Eloquent) scope.
    console.log('Save product', form);
    navigate('/products');
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormPanel
        title="ADD NEW PRODUCT"
        closeTo="/products"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => navigate('/products')}>
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Save Product
            </Button>
          </>
        }
      >
        <FormField label="Product ID">
          <input value={form.productId} onChange={(e) => update('productId', e.target.value)} />
        </FormField>
        <FormField label="Product Name">
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Smart Thermostat"
            required
          />
        </FormField>

        <FormField label="Category">
          <select value={form.category} onChange={(e) => update('category', e.target.value)} required>
            <option value="" disabled>
              Select category
            </option>
            <option>Group A (AC)</option>
            <option>Group B (Purifier)</option>
            <option>Group C (Filter)</option>
          </select>
        </FormField>
        <FormField label="Unit Price">
          <input
            type="number"
            min="0"
            value={form.unitPrice}
            onChange={(e) => update('unitPrice', e.target.value)}
            placeholder="₱"
            required
          />
        </FormField>

        <FormField label="Starting Quantity">
          <input
            type="number"
            min="0"
            value={form.startingQty}
            onChange={(e) => update('startingQty', e.target.value)}
          />
        </FormField>
        <FormField label="Is Perishable?">
          <select value={form.perishable} onChange={(e) => update('perishable', e.target.value)}>
            <option>No</option>
            <option>Yes</option>
          </select>
        </FormField>
      </FormPanel>
    </form>
  );
}
