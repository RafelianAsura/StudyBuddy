import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userName = localStorage.getItem('user_name') || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  const isLoggedIn = !!onLogout;
  const isDashboard = location.pathname === '/dashboard';
  const isLanding = location.pathname === '/';

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.classList.toggle('menu-open', !v);
      return !v;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    document.body.classList.remove('menu-open');
  };

  const handleLogout = () => {
    closeMenu();
    onLogout();
  };

  const switchTab = (tabIndex) => {
    closeMenu();
    if (isDashboard) {
      window.dispatchEvent(new CustomEvent('sb-switch-tab', { detail: tabIndex }));
    } else {
      navigate('/dashboard', { state: { tab: tabIndex } });
    }
  };

  const isActiveLink = (path) => location.pathname === path;

  const linkStyle = (active) => ({
    textDecoration: 'none',
    color: active ? 'var(--primary)' : 'var(--text-muted)',
    margin: '0 1.2rem',
    fontSize: '0.95rem',
    fontWeight: active ? 700 : 500,
    transition: '0.3s',
    position: 'relative',
  });

  return (
    <nav style={{
      height: 72, display: 'flex', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 1000,
      backdropFilter: 'blur(20px)',
      backgroundColor: theme === 'dark' ? 'rgba(5,5,5,0.85)' : 'rgba(252,252,253,0.85)',
      borderBottom: '1px solid var(--border)',
    }}>
      <style>{`
        .nb-links { display: flex; align-items: center; }
        .nb-actions { display: flex; align-items: center; gap: 1rem; }
        .nb-burger { display: none; }
        @media (max-width: 768px) {
          .nb-links { display: none; }
          .nb-actions { display: none; }
          .nb-burger { display: flex; }
        }
        .nb-navlink:hover { color: var(--primary) !important; }
        .nb-tab-btn:hover { color: var(--primary) !important; }
        .nb-dropdown-item:hover { background: var(--glass) !important; color: var(--primary) !important; }
        .nb-logout-item:hover { background: rgba(239,68,68,0.08) !important; color: #ef4444 !important; }
        .nb-avatar:hover { opacity: 0.85; }
        .nb-theme-btn:hover { background: var(--bg-card) !important; }
      `}</style>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>

        {/* Logo */}
        <Link to={isLoggedIn ? '/dashboard' : '/'} onClick={closeMenu}
          style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: '1.3rem', textDecoration: 'none', color: 'var(--text-main)', flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>SB</div>
          StudyBuddy
        </Link>

        {/* Desktop Nav Links */}
        <div className="nb-links">
          {isLanding && (
            <>
              <a href="#features" className="nb-navlink" style={linkStyle(false)}>Fitur</a>
              <a href="#about" className="nb-navlink" style={linkStyle(false)}>Tentang</a>
            </>
          )}
          {isDashboard && (
            <>
              <button onClick={() => switchTab(0)} className="nb-tab-btn"
                style={{ ...linkStyle(false), background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
                Tugas
              </button>
              <button onClick={() => switchTab(1)} className="nb-tab-btn"
                style={{ ...linkStyle(false), background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
                Catatan
              </button>
              <button onClick={() => switchTab(2)} className="nb-tab-btn"
                style={{ ...linkStyle(false), background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
                Focus Timer
              </button>
              <button onClick={() => switchTab(3)} className="nb-tab-btn"
                style={{ ...linkStyle(false), background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
                Rekap
              </button>
            </>
          )}
          {!isLanding && !isDashboard && (
            <Link to="/" className="nb-navlink" style={linkStyle(isActiveLink('/'))}>Beranda</Link>
          )}
        </div>

        {/* Burger */}
        <button onClick={toggleMenu} className="nb-burger"
          style={{ flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span style={{ width: 24, height: 2.5, background: 'var(--text-main)', borderRadius: 2, display: 'block', transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : 'none' }} />
          <span style={{ width: 24, height: 2.5, background: 'var(--text-main)', borderRadius: 2, display: 'block', transition: '0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 24, height: 2.5, background: 'var(--text-main)', borderRadius: 2, display: 'block', transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : 'none' }} />
        </button>

        {/* Desktop Actions */}
        <div className="nb-actions">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="nb-theme-btn"
            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 6, transition: '0.3s' }}>
            <span className="sun-icon">☀️</span>
            <span className="moon-icon">🌙</span>
          </button>

          {isLoggedIn ? (
            /* Avatar Dropdown */
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(v => !v)} className="nb-avatar"
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '6px 12px 6px 6px', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                  {userInitial}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', transition: '0.3s', transform: dropdownOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▼</span>
              </button>

              {dropdownOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.5rem', minWidth: 180, boxShadow: 'var(--shadow)', zIndex: 100 }}>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 2 }}>Masuk sebagai</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</div>
                  </div>
                  {[
                    { label: '📋 Tugas', tab: 0 },
                    { label: '📝 Catatan', tab: 1 },
                    { label: '⏱️ Focus Timer', tab: 2 },
                    { label: '📊 Rekap', tab: 3 },
                  ].map(item => (
                    <button key={item.label} onClick={() => { setDropdownOpen(false); switchTab(item.tab); }}
                      className="nb-dropdown-item"
                      style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.6rem 1rem', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', color: 'var(--text-main)', transition: '0.2s' }}>
                      {item.label}
                    </button>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                    <button onClick={handleLogout} className="nb-logout-item"
                      style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.6rem 1rem', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', color: 'var(--text-muted)', transition: '0.2s' }}>
                      🚪 Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : isDashboard ? (
            /* Guest on dashboard */
            <Link to="/login"
              style={{ background: 'var(--primary)', color: 'white', padding: '9px 20px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
              Login
            </Link>
          ) : (
            /* Landing / auth pages */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login"
                style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem', padding: '9px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                Masuk
              </Link>
              <Link to="/dashboard"
                style={{ background: 'var(--primary)', color: 'white', padding: '9px 20px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                Coba Gratis
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 72, right: 0, width: '75%', maxWidth: 320, height: 'calc(100vh - 72px)',
          background: 'var(--bg-card)', borderLeft: '1px solid var(--border)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
          zIndex: 1500, overflowY: 'auto', boxShadow: 'var(--shadow)',
        }}>
          {isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.75rem 1rem', background: 'var(--glass)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem', border: '1px solid var(--border)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
                {userInitial}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{userName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Akun Aktif</div>
              </div>
            </div>
          )}

          {isLanding && ['Fitur', 'Tentang'].map((label, i) => (
            <a key={label} href={['#features', '#about'][i]} onClick={closeMenu}
              style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.95rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', display: 'block' }}>
              {label}
            </a>
          ))}

          {isDashboard && [
            { label: '📋 Tugas', tab: 0 },
            { label: '📝 Catatan', tab: 1 },
            { label: '⏱️ Focus Timer', tab: 2 },
            { label: '📊 Rekap', tab: 3 },
          ].map(item => (
            <button key={item.label} onClick={() => switchTab(item.tab)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.95rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}>
              {item.label}
            </button>
          ))}

          <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => { toggleTheme(); closeMenu(); }}
              style={{ background: 'var(--glass)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontFamily: 'inherit', color: 'var(--text-main)' }}>
              <span className="sun-icon">☀️</span>
              <span className="moon-icon">🌙</span>
              <span>{theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
            </button>

            {isLoggedIn ? (
              <button onClick={handleLogout}
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', width: '100%', fontSize: '0.95rem' }}>
                🚪 Keluar
              </button>
            ) : isDashboard ? (
              <Link to="/login" onClick={closeMenu}
                style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 700, textAlign: 'center', fontSize: '0.95rem' }}>
                Login
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}
                  style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600, textAlign: 'center', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}>
                  Masuk
                </Link>
                <Link to="/dashboard" onClick={closeMenu}
                  style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 700, textAlign: 'center', fontSize: '0.95rem' }}>
                  Coba Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Backdrop for dropdown */}
      {dropdownOpen && (
        <div onClick={() => setDropdownOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
      )}
    </nav>
  );
};

export default Navbar;
