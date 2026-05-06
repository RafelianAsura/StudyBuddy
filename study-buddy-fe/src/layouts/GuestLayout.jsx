import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const GuestLayout = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default GuestLayout;
