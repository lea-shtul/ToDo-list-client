import { useState } from 'react';
import service from './service';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await service.register(username, password);
      await service.login(username, password); // נכנסים ישר אחרי ההרשמה
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data || 'ההרשמה נכשלה');
    }
  }

  return (
    <div className="page">
      <div className="card auth-card">
        <h2>הרשמה</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="input" placeholder="שם משתמש" value={username}
                 onChange={e => setUsername(e.target.value)} required />
          <input className="input" type="password" placeholder="סיסמה" value={password}
                 onChange={e => setPassword(e.target.value)} required />
          <button className="btn btn-primary" type="submit">הרשמה</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="switch">כבר יש לך משתמש? <a href="/login">להתחברות</a></p>
      </div>
    </div>
  );
}

export default Register;
