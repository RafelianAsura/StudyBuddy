import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');
    try {
      const response = await authService.login({ email, password });
      if (response.token) {
        onLoginSuccess(response.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal login. Periksa email dan password.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setInfo('Fitur reset password belum tersedia. Hubungi admin jika lupa password.');
    setTimeout(() => setInfo(''), 4000);
  };

  const inputStyle = {
    width: '100%', padding: '14px 18px',
    background: 'var(--bg-main)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text-main)',
    fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none', transition: '0.3s',
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', backgroundColor: 'var(--bg-main)',
      background: 'radial-gradient(circle at top right, var(--glass), transparent), radial-gradient(circle at bottom left, rgba(99,102,241,0.05), transparent)',
    }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '2rem 1rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow)' }}>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontWeight: 800, fontSize: '1.4rem', textDecoration: 'none', color: 'var(--text-main)', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: 10 }} />
              StudyBuddy
            </Link>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>Selamat Datang Kembali</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Lanjutkan perjalanan belajarmu sekarang.</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '1.5rem', color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {info && (
            <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '0.9rem', textAlign: 'center' }}>
              {info}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
              <input type="email" placeholder="nama@email.com" required value={email}
                onChange={e => setEmail(e.target.value)} style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
                <a href="#" onClick={handleForgotPassword} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                  Lupa Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" required value={password}
                  onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, paddingRight: 50 }}
                  onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, fontSize: '1rem' }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', marginTop: '0.5rem', padding: 16,
              background: loading ? 'var(--primary-alt)' : 'var(--primary)',
              color: 'white', border: 'none', borderRadius: 'var(--radius-sm)',
              fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: '0.3s',
            }}>
              {loading ? 'Sedang Masuk...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Belum punya akun? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Daftar Gratis</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
