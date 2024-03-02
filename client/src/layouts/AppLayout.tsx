import { useAuth } from '@/contexts/AuthContext';
import AppHeader from '@/headers/AppHeader';
import { Outlet, Navigate } from 'react-router-dom';


export default function AppLayout() {
  const { auth } = useAuth();
  if (!auth || !auth.accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto mt-16 max-w-[1440px] px-6 py-5">
        <Outlet />
      </main>
    </>
  );
}
