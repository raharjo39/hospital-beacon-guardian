
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '@/components/auth/LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
