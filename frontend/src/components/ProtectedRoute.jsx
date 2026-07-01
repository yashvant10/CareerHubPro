import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'employer' ? '/employer' : '/applicant'} replace />;
  }

  return children;
}
