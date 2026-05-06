import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }
        .hero-visual { position: relative; display: flex; justify-content: flex-end; }
        .visual-container { position: relative; width: 100%; max-width: 480px; margin-left: auto; }
        .floating-stat { position: absolute; bottom: -30px; left: -40px; }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
          .hero-info { display: flex; flex-direction: column; align-items: center; }
          .hero-visual { justify-content: center; margin-top: 2rem; }
          .visual-container { margin: 0 auto; }
          .floating-stat { left: 50%; transform: translateX(-50%); bottom: -20px; }
          .search-box { margin: 0 auto 2.5rem auto !important; max-width: 400px !important; }
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 280px);
          gap: 1.5rem;
        }
        .bento-span2 { grid-column: span 2; }
        .bento-row2 { grid-row: span 2; }

        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
          .bento-span2 { grid-column: span 1; }
          .bento-row2 { grid-row: span 1; }
          .bento-card { min-height: 200px; }
        }

        .footer-links-grid {
          flex: 2;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .footer-links-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
          .footer-top { flex-direction: column; gap: 2rem; }
        }

        .footer-link-item:hover { color: var(--primary) !important; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <div className="hero-grid">
            <div className="hero-info">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--glass)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 600, marginBottom: '2rem' }}>
                <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                StudyBuddy: AI-Powered Learning
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-2px', marginBottom: '2rem' }}>
                Kuasai Belajarmu <br />
                <span className="text-gradient">Tanpa Batas.</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: 520, marginBottom: '3rem' }}>
                Satu ruang kerja digital untuk mengatur jadwal, tugas, dan fokus. Dibangun untuk performa, dirancang untuk kenyamanan mata.
              </p>

              <div className="search-box" style={{ marginBottom: '2.5rem', width: '100%', maxWidth: 500 }}>
                <form onSubmit={e => { e.preventDefault(); navigate('/dashboard'); }}
                  style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 6, borderRadius: 18, boxShadow: 'var(--shadow)', transition: 'border-color 0.3s' }}
                  onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari materi atau tugas..."
                    style={{ flex: 1, background: 'transparent', border: 'none', padding: '0 1.5rem', color: 'var(--text-main)', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                  <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 14, fontWeight: 700, cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit' }}>
                    Cari
                  </button>
                </form>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Dukungan <strong>24/7</strong> untuk 10k+ pelajar aktif.
              </p>
            </div>

            <div className="hero-visual">
              <div className="visual-container">
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                  <div style={{ background: 'var(--glass)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 15, borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[0, 1, 2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.3, display: 'inline-block' }} />)}
                    </div>
                    <div style={{ flex: 1, background: 'var(--bg-main)', fontSize: '0.7rem', padding: '4px 12px', borderRadius: 6, color: 'var(--text-muted)', textAlign: 'center' }}>
                      studybuddy.app/dashboard
                    </div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    {[
                      { title: 'Database Design', sub: 'Deadline: 14.00 WIB', done: true },
                      { title: 'UI/UX Research', sub: 'Progress: 45%', done: false },
                    ].map((task, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 15, background: 'var(--bg-main)', padding: 15, borderRadius: 12, marginBottom: 12 }}>
                        <div style={{ width: 20, height: 20, border: '2px solid var(--primary)', borderRadius: 6, flexShrink: 0, background: task.done ? 'var(--primary)' : 'transparent', boxShadow: task.done ? '0 0 10px var(--primary)' : 'none' }} />
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: 700 }}>{task.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{task.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="float-anim floating-stat" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 20, borderRadius: 20, display: 'flex', alignItems: 'center', gap: 15, boxShadow: 'var(--shadow)' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔥</span>
                  <div>
                    <strong style={{ display: 'block' }}>12 Hari</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Streak Belajar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-card)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>Fitur Masa Depan</h2>
            <p style={{ color: 'var(--text-muted)' }}>Efisiensi bukan lagi sekadar impian, melainkan standar baru.</p>
          </div>

          <div className="bento-grid">
            {[
              { title: 'AI Schedule Optimization', desc: 'Sistem kami menganalisis pola belajarmu untuk menyarankan waktu istirahat yang tepat agar otak tetap segar.', span2: true, extra: null },
              { title: 'Deep Focus Timer', desc: 'Mode fokus yang memblokir semua notifikasi distraksi.', row2: true, extra: <div style={{ fontSize: '4rem', fontWeight: 800, marginTop: '2rem', color: 'var(--primary)' }}>25:00</div> },
              { title: 'Cloud Sync', desc: 'Akses tugas dari perangkat mana pun.', extra: null },
              { title: 'Secure Login', desc: 'Keamanan data tingkat tinggi dengan enkripsi AES-256.', extra: null },
            ].map((card) => (
              <div key={card.title}
                className={`bento-card${card.span2 ? ' bento-span2' : ''}${card.row2 ? ' bento-row2' : ''}`}
                style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>{card.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{card.desc}</p>
                  {card.extra}
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '50%', background: 'linear-gradient(transparent, var(--primary))', opacity: 0.07, pointerEvents: 'none' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="about-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--glass)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--primary)' }}>
                Tentang Kami
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Dibangun untuk <span className="text-gradient">pelajar masa kini.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                StudyBuddy lahir dari kebutuhan nyata mahasiswa yang kesulitan mengatur waktu belajar. Kami percaya produktivitas bukan soal kerja keras semata, tapi kerja cerdas.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8 }}>
                Dengan antarmuka yang bersih dan fitur yang tepat sasaran, StudyBuddy membantu kamu fokus pada hal yang paling penting.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: '🎯', label: 'Fokus', desc: 'Dirancang untuk meminimalkan distraksi' },
                { icon: '⚡', label: 'Cepat', desc: 'Antarmuka ringan dan responsif' },
                { icon: '🔒', label: 'Aman', desc: 'Data kamu terenkripsi dan terlindungi' },
                { icon: '🌙', label: 'Dark Mode', desc: 'Nyaman dipakai siang maupun malam' },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '6rem 0 3rem', borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', gap: '4rem' }}>
            <div style={{ flex: 1, maxWidth: 320 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: 8 }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>StudyBuddy.</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Platform Belajar Terintegrasi Masa Depan.</p>
            </div>
            <div className="footer-links-grid">
              {[
                { title: 'Produk', links: ['Fitur', 'Keamanan', 'Pricing'] },
                { title: 'Perusahaan', links: ['Tentang Kami', 'Karir', 'Kontak'] },
                { title: 'Komunitas', links: ['Discord', 'Twitter'] },
              ].map((group) => (
                <div key={group.title}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>{group.title}</h4>
                  {group.links.map((link) => (
                    <a key={link} href="#" className="footer-link-item"
                      style={{ display: 'block', textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem', transition: '0.3s' }}>
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>© 2026 StudyBuddy Team. Built with heart by CC26-PS048.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
