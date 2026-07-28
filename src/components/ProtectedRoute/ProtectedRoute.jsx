import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in via localStorage
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const userId = localStorage.getItem("user_id");
        
        if (isLoggedIn && userId) {
          // Verify with backend
          const response = await fetch("http://localhost/testphp/api/verify.php", {
            method: "GET",
            credentials: "include", // Important for session cookies
          });
          
          const data = await response.json();
          
          if (data.success) {
            setIsAuthenticated(true);
          } else {
            // Clear invalid session
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user_id");
            localStorage.removeItem("username");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Loading state
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in
  return children;
};

export default ProtectedRoute;