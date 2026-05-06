import { motion } from 'framer-motion';
import { Trash2, CheckCircle } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-main)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => onToggle(task.id)} style={{
          background: task.completed ? 'rgba(16,185,129,0.1)' : 'transparent',
          border: 'none', cursor: 'pointer', padding: 4, borderRadius: '50%',
          color: task.completed ? '#10b981' : 'var(--text-muted)', display: 'flex',
        }}>
          <CheckCircle size={22} />
        </button>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
          {task.title}
        </span>
      </div>
      <button onClick={() => onDelete(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 6, display: 'flex', borderRadius: 8 }}
        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
};

export default TaskItem;
