import styles from './StatusBadge.module.css';

const STATUS_TONE = {
  'OK': 'green',
  'In Stock': 'green',
  'Low Stock': 'yellow',
  'Reorder Alert': 'yellow',
  'Below RoP': 'yellow',
  'Out of Stock': 'red',
  'Sale': 'blue',
  'Return': 'green',
  'Damage': 'red',
};

export default function StatusBadge({ status }) {
  const tone = STATUS_TONE[status] || 'blue';
  return <span className={`${styles.badge} ${styles[tone]}`}>{status}</span>;
}
