import { useAuth } from '@/contexts/AuthContext';
import PriaveHeader from '@/headers/PrivateHeader';
import { Outlet, Navigate } from 'react-router-dom';




export default function BaseLayout() {
  const { auth } = useAuth();
  if (!auth || !auth.accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <PriaveHeader />
      <main className="mx-auto mt-16 max-w-[1440px] px-6 py-5">
        <Outlet />
      </main>
    </>
  );
}
