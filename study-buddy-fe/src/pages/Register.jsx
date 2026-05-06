import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const getPasswordStrength = (password) => {
  if (password.length === 0) return 0;
  if (password.length < 6) return 25;
  if (password.length < 8) return 50;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 100;
  return 75;
};

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const strength = getPasswordStrength(formData.password);
  const strengthColor = strength <= 25 ? '#ef4444' : strength <= 50 ? '#f59e0b' : strength <= 75 ? '#3b82f6' : '#10b981';

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await authService.signup(formData);
      setSuccess('Akun berhasil dibuat! Mengarahkan ke halaman login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal daftar. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
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
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>Buat Akun Baru</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Mulai atur jadwal belajarmu dengan cerdas.</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '1.5rem', color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '1.5rem', color: '#10b981', fontSize: '0.9rem', textAlign: 'center' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama Anda" required value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
              <input type="email" placeholder="nama@email.com" required value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password</label>
              <input type="password" placeholder="Minimal 8 karakter" required value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })} style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
              {formData.password.length > 0 && (
                <div style={{ marginTop: 8, height: 4, background: 'var(--glass)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${strength}%`, background: strengthColor, borderRadius: 10, transition: 'width 0.3s ease, background 0.3s ease' }} />
                </div>
              )}
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '1.5rem 0' }}>
              <div onClick={() => setAgreed(v => !v)} style={{
                width: 18, height: 18, border: `2px solid ${agreed ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 4, background: agreed ? 'var(--primary)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, transition: '0.3s',
              }}>
                {agreed && <span style={{ color: 'white', fontSize: 12, lineHeight: 1 }}>✓</span>}
              </div>
              <span>Saya setuju dengan <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Syarat & Ketentuan</a></span>
            </label>

            <button type="submit" disabled={loading || !formData.name || !formData.email || !formData.password || !agreed}
              style={{
                width: '100%', padding: 16,
                background: 'var(--primary)', color: 'white', border: 'none',
                borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                opacity: (!formData.name || !formData.email || !formData.password || !agreed) ? 0.5 : 1,
                transition: '0.3s',
              }}>
              {loading ? 'Sedang Membuat Akun...' : 'Buat Akun'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Sudah punya akun? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Masuk di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
