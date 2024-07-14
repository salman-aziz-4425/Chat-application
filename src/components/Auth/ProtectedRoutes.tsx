
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/service/auth.service';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  const { isAuthenticated } = useAuth()


  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
