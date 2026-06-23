import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const notesUnlocked = sessionStorage.getItem('notes_app_notes_unlocked_v1') === 'true';




  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Extra gate: user must unlock notes for this session
  if (!notesUnlocked) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute;