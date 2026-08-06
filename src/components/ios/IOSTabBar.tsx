import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const IOSTabBar: React.FC = () => {
  const { roleView } = useApp();
  const { isAuthenticated } = useAuth();

  // All primary navigation is handled by the single unified navbar in IOSHeader
  // When unauthenticated or on public/student pages, do not render duplicate tab bars
  if (!isAuthenticated || roleView === 'public' || roleView === 'student') {
    return null;
  }

  return null;
};
