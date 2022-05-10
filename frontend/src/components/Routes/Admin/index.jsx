import { useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';

import ProtectedRoute from "../Protected";

export default function AdminRoute ({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <ProtectedRoute isAllowed={user?.Permission === 'administrator'}>
      {children}
    </ProtectedRoute>
  )
}