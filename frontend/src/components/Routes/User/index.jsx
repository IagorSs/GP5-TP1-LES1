import { useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';

import ProtectedRoute from "../Protected";

export default function UserRoute ({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <ProtectedRoute isAllowed={user?.Permission === 'client'}>
      {children}
    </ProtectedRoute>
  )
}