import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import {
  DashboardIcon,
  ProductIcon,
  TransactionIcon,
  ReportIcon,
  AlertIcon,
  LocationIcon,
  SettingsIcon,
  LogoutIcon,
  BoltIcon,
} from '../ui/Icons.jsx';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/products', label: 'Products', icon: ProductIcon },
  { to: '/transactions', label: 'Transaction', icon: TransactionIcon },
  { to: '/reports', label: 'Report', icon: ReportIcon },
  { to: '/alerts', label: 'Alerts', icon: AlertIcon },
  { to: '/locations', label: 'Location', icon: LocationIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/');
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>
          <BoltIcon width={18} height={18} />
        </span>
        <div className={styles.brandText}>
          <p className={styles.brandName}>WalangBrownout</p>
          <p className={styles.brandSub}>Inventory Management</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
          >
            <Icon width={18} height={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className={styles.logout} onClick={handleLogout}>
        <LogoutIcon width={18} height={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
