import AuthProvider from './contexts/AuthContext';
import Routes from './Router';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
