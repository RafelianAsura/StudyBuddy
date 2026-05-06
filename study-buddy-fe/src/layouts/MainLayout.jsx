import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = ({ onLogout }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Navbar onLogout={onLogout} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
