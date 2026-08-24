import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { BoltIcon } from '../components/ui/Icons.jsx';
import Button from '../components/ui/Button.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Auth against Laravel/Sanctum is Module 2 scope — this build is frontend-only,
    // so continuing simply takes the user into the app shell.
    navigate('/dashboard');
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <BoltIcon width={26} height={26} />
        </div>
        <h1 className={styles.title}>WalangBrownout Inventory System</h1>
        <p className={styles.subtitle}>Your distributor of home's comfort goods</p>

        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="accent" className={styles.submit}>
          Continue
        </Button>
      </form>
    </div>
  );
}
