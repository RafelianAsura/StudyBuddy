import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import taskService from '../services/taskService';
import { Trash2, CheckCircle, Plus, Loader2, BookOpen, BarChart2, Clock } from 'lucide-react';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const Dashboard = ({ isGuest }) => {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(!isGuest);
  const [newTaskName, setNewTaskName] = useState('');
  const [activeTab, setActiveTab] = useState(location.state?.tab ?? 0);

  useEffect(() => {
    const handler = (e) => setActiveTab(e.detail);
    window.addEventListener('sb-switch-tab', handler);
    return () => window.removeEventListener('sb-switch-tab', handler);
  }, []);
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState(localStorage.getItem('sb_note') || '');
  const [timerSec, setTimerSec] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [taskError, setTaskError] = useState('');
  const userName = localStorage.getItem('user_name') || 'Pengguna';
  const TODAY = new Date();
  const TODAY_IDX = TODAY.getDay();

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  useEffect(() => {
    if (isGuest) return;
    taskService.getTasks()
      .then(data => setTasks(data))
      .finally(() => setIsLoading(false));
  }, [isGuest]);

  useEffect(() => {
    if (!timerRunning) return;
    if (timerSec <= 0) { setTimerRunning(false); return; }
    const id = setInterval(() => setTimerSec(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning, timerSec]);

  useEffect(() => {
    setTimerRunning(false);
  }, [activeTab]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    setTaskError('');
    try {
      const response = await taskService.createTask({ title: newTaskName, completed: false });
      setTasks(prev => [...prev, response]);
      setNewTaskName('');
    } catch {
      setTaskError('Gagal menambah tugas. Coba lagi.');
    }
  };

  const handleToggle = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updated = !task.completed;
    try {
      await taskService.updateTask(id, { completed: updated });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: updated } : t));
    } catch {
      setTaskError('Gagal update tugas. Coba lagi.');
    }
  };

  const handleDelete = async (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await taskService.deleteTask(confirmDeleteId);
      setTasks(prev => prev.filter(t => t.id !== confirmDeleteId));
    } catch (err) {
      setTaskError('Gagal menghapus tugas: ' + (err.response?.data?.message || 'Unknown error'));
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const saveNote = () => {
    localStorage.setItem('sb_note', note);
    setSavedNote(note);
    setNote('');
  };

  const formatTimer = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const resetTimer = () => { setTimerRunning(false); setTimerSec(25 * 60); };

  const TABS = [
    { label: 'Utama', icon: '📋' },
    { label: 'Catatan', icon: '📝' },
    { label: 'Focus Timer', icon: '⏱️' },
    { label: 'Rekap', icon: '📊' },
  ];

  const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.8rem' };
  const inputStyle = { background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '6px 14px', color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none' };

  return (
    <div style={{ paddingTop: 40, paddingBottom: 50, backgroundColor: 'var(--bg-main)', minHeight: 'calc(100vh - 90px)' }}>
      <style>{`
        .dash-grid { display: grid; grid-template-columns: 320px 1fr; gap: 2rem; }
        @media (max-width: 992px) { .dash-grid { grid-template-columns: 1fr; } }
        .task-delete-btn:hover { color: #ef4444 !important; }
        .tab-btn:hover { border-color: var(--primary) !important; color: var(--text-main) !important; }
        .dash-container { padding: 0 2rem; }
        .task-form { display: flex; gap: 8px; flex-wrap: wrap; }
        .task-input { width: 220px; }
        @media (max-width: 600px) {
          .dash-container { padding: 0 1rem; }
          .task-form { width: 100%; }
          .task-input { width: 100%; flex: 1; min-width: 0; }
        }
      `}</style>

      {/* Inline Delete Confirm Modal */}
      {confirmDeleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '2rem', maxWidth: 360, width: '100%', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🗑️</div>
            <h4 style={{ fontWeight: 700, marginBottom: 8 }}>Hapus Tugas?</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Tindakan ini tidak dapat dibatalkan.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setConfirmDeleteId(null)} style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '10px 24px', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
              <button onClick={confirmDelete} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="dash-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* Alert Banner - Guest */}
        {isGuest && (
          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-md)', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h5 style={{ color: '#f59e0b', marginBottom: 4, fontSize: '1rem', fontWeight: 700 }}>⚠️ Mode Tamu Aktif</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Login untuk menyimpan tugas dan mengakses semua fitur.</p>
            </div>
            <Link to="/login" style={{ background: 'var(--primary)', color: 'white', padding: '8px 20px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Login Sekarang</Link>
          </div>
        )}

        {/* Header */}
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>
            Halo, {isGuest ? 'Tamu' : userName} 👋
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: '0.95rem' }}>
            {TODAY.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        {/* Tabs */}
        <div className="tab-scrollbar" style={{ display: 'flex', gap: 8, marginBottom: '2rem', overflowX: 'auto', paddingBottom: 4 }}>
          {TABS.map((tab, i) => (
            <button key={tab.label} className="tab-btn" onClick={() => setActiveTab(i)} style={{
              padding: '10px 20px', borderRadius: 'var(--radius-sm)', fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', fontSize: '0.9rem',
              transition: '0.3s', border: '1px solid var(--border)',
              background: activeTab === i ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === i ? 'white' : 'var(--text-muted)',
              borderColor: activeTab === i ? 'var(--primary)' : 'var(--border)',
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 0 - UTAMA */}
        {activeTab === 0 && (
          <div className="dash-grid">
            {/* Sidebar - Hari & Statistik */}
            <aside style={{ ...cardStyle, height: 'fit-content' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem' }}>📅 Minggu Ini</h4>

              <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
                {DAYS.map((day, i) => (
                  <div key={day} style={{
                    flex: 1, aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 8, fontSize: '0.75rem', fontWeight: 600,
                    background: i === TODAY_IDX ? 'var(--primary)' : 'var(--glass)',
                    color: i === TODAY_IDX ? 'white' : 'var(--text-muted)',
                  }}>
                    {day}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <BookOpen size={18} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Total Tugas</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{tasks.length}</div>
                  </div>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle size={18} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Selesai</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{completedCount}</div>
                  </div>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <BarChart2 size={18} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Progress</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{progressPct}%</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main - Tasks */}
            <section style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12 }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>✅ Daftar Tugas</h4>
                {!isGuest && (
                  <form onSubmit={handleAddTask} className="task-form">
                    <input value={newTaskName} onChange={e => { setNewTaskName(e.target.value); setTaskError(''); }}
                      placeholder="Tambah tugas baru..." className="task-input" style={{ ...inputStyle }}
                      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                    <button type="submit" disabled={!newTaskName.trim()} style={{
                      background: 'var(--primary)', color: 'white', border: 'none',
                      padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 700,
                      cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', gap: 4, opacity: !newTaskName.trim() ? 0.5 : 1,
                    }}>
                      <Plus size={14} /> Tambah
                    </button>
                  </form>
                )}
              </div>

              {taskError && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '1rem', color: '#ef4444', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {taskError}
                  <button onClick={() => setTaskError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>×</button>
                </div>
              )}

              {/* Progress Bar */}
              {tasks.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>{completedCount} dari {tasks.length} selesai</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{progressPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--glass)', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: 10, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              )}

              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <Loader2 style={{ margin: '0 auto 8px', animation: 'spin 1s linear infinite' }} size={32} />
                  <p>Memuat tugas...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block', opacity: 0.4 }}>📂</span>
                  <p style={{ fontWeight: 700, marginBottom: 4 }}>Belum ada tugas</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    {isGuest ? 'Login untuk mulai mengelola tugas.' : 'Tambahkan tugas pertamamu di atas.'}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <AnimatePresence>
                    {tasks.map(task => (
                      <motion.div key={task.id}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-main)', padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <button onClick={() => handleToggle(task.id)} style={{
                            background: task.completed ? 'rgba(16,185,129,0.1)' : 'transparent',
                            border: 'none', cursor: 'pointer', padding: 4, borderRadius: '50%',
                            color: task.completed ? '#10b981' : 'var(--text-muted)', display: 'flex', transition: '0.2s',
                          }}>
                            <CheckCircle size={20} />
                          </button>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                            {task.title}
                          </span>
                        </div>
                        {!isGuest && (
                          <button className="task-delete-btn" onClick={() => handleDelete(task.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 6, display: 'flex', borderRadius: 8, transition: '0.2s' }}>
                            <Trash2 size={16} />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 1 - CATATAN */}
        {activeTab === 1 && (
          <div style={cardStyle}>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem' }}>📝 Catatan Cepat</h4>
            {isGuest ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8, opacity: 0.4 }}>🔒</span>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>Login untuk menggunakan catatan</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Catatan disimpan di browser kamu.</p>
              </div>
            ) : (
              <>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Tulis catatan, ide, atau ringkasan materi di sini..."
                  style={{
                    width: '100%', minHeight: 200, padding: '1rem', background: 'var(--bg-main)',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.95rem',
                    outline: 'none', resize: 'vertical', lineHeight: 1.7,
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                  <button onClick={saveNote} disabled={!note.trim()} style={{
                    background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 24px',
                    borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    opacity: !note.trim() ? 0.5 : 1,
                  }}>
                    Simpan Catatan
                  </button>
                </div>
                {savedNote && (
                  <div style={{ marginTop: '2rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Catatan Tersimpan</p>
                    <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem', fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                      {savedNote}
                    </div>
                    <button onClick={() => { setSavedNote(''); localStorage.removeItem('sb_note'); }} style={{ marginTop: 8, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit', padding: 0 }}>
                      Hapus catatan
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB 2 - FOCUS TIMER */}
        {activeTab === 2 && (
          <div style={{ ...cardStyle, textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
            <Clock size={32} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>⏱️ Deep Focus Timer</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Teknik Pomodoro — 25 menit fokus, lalu istirahat.</p>

            <div style={{ fontSize: '5rem', fontWeight: 800, color: timerSec <= 60 ? '#ef4444' : 'var(--primary)', letterSpacing: '-2px', marginBottom: '2rem', fontVariantNumeric: 'tabular-nums' }}>
              {formatTimer(timerSec)}
            </div>

            <div style={{ width: '100%', height: 6, background: 'var(--glass)', borderRadius: 10, overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ height: '100%', width: `${((25 * 60 - timerSec) / (25 * 60)) * 100}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: 10, transition: 'width 1s linear' }} />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setTimerRunning(v => !v)} style={{
                background: timerRunning ? 'var(--accent)' : 'var(--primary)', color: 'white',
                border: 'none', padding: '12px 32px', borderRadius: 'var(--radius-sm)',
                fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {timerRunning ? '⏸ Pause' : timerSec === 25 * 60 ? '▶ Mulai' : '▶ Lanjut'}
              </button>
              <button onClick={resetTimer} style={{
                background: 'var(--bg-main)', color: 'var(--text-muted)', border: '1px solid var(--border)',
                padding: '12px 24px', borderRadius: 'var(--radius-sm)', fontWeight: 600,
                fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Reset
              </button>
            </div>

            {timerSec === 0 && (
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-sm)', color: '#10b981', fontWeight: 700 }}>
                🎉 Sesi fokus selesai! Waktunya istirahat.
              </div>
            )}
          </div>
        )}

        {/* TAB 3 - REKAP */}
        {activeTab === 3 && (
          <div style={cardStyle}>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem' }}>📊 Rekap Tugas</h4>
            {tasks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8, opacity: 0.4 }}>📊</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{isGuest ? 'Login untuk melihat rekap.' : 'Belum ada data tugas.'}</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Total Tugas', value: tasks.length, color: 'var(--primary)', icon: '📋' },
                  { label: 'Selesai', value: completedCount, color: '#10b981', icon: '✅' },
                  { label: 'Belum Selesai', value: tasks.length - completedCount, color: 'var(--accent)', icon: '⏳' },
                  { label: 'Progress', value: `${progressPct}%`, color: '#f59e0b', icon: '📈' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 10 }}>Distribusi Status</p>
                  <div style={{ display: 'flex', gap: 4, height: 12, borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ width: `${progressPct}%`, background: '#10b981', transition: 'width 0.8s ease' }} />
                    <div style={{ flex: 1, background: 'var(--glass)' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: 10, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span><span style={{ color: '#10b981' }}>●</span> Selesai ({completedCount})</span>
                    <span><span style={{ color: 'var(--text-muted)' }}>●</span> Belum ({tasks.length - completedCount})</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', marginTop: 60, paddingTop: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>© 2026 StudyBuddy. {isGuest ? 'Mode Tamu' : `Dashboard — ${userName}`}</p>
      </footer>
    </div>
  );
};

export default Dashboard;
