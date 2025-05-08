
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteWrapperProps {
  element: JSX.Element;
}

export const PrivateRouteWrapper = ({ element }: PrivateRouteWrapperProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

