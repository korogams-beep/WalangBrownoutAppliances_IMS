import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import ProductForm from './pages/ProductForm.jsx';
import Locations from './pages/Locations.jsx';
import Transactions from './pages/Transactions.jsx';
import ReceiveBatch from './pages/ReceiveBatch.jsx';
import RecordTransaction from './pages/RecordTransaction.jsx';
import Reports from './pages/Reports.jsx';
import Alerts from './pages/Alerts.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id/edit" element={<ProductForm />} />

        <Route path="/locations" element={<Locations />} />

        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/receive" element={<ReceiveBatch />} />
        <Route path="/transactions/new" element={<RecordTransaction />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
