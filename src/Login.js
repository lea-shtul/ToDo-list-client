import { useState } from 'react';
import service from './service';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await service.login(username, password);
      window.location.href = '/';
    } catch {
      setError('שם משתמש או סיסמה שגויים');
    }
  }

  return (
    <div className="page">
      <div className="card auth-card">
        <h2>התחברות</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="input" placeholder="שם משתמש" value={username}
                 onChange={e => setUsername(e.target.value)} required />
          <input className="input" type="password" placeholder="סיסמה" value={password}
                 onChange={e => setPassword(e.target.value)} required />
          <button className="btn btn-primary" type="submit">התחברות</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="switch">אין לך משתמש? <a href="/register">להרשמה</a></p>
      </div>
    </div>
  );
}

export default Login;
