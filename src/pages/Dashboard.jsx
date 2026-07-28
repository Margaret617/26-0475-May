import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost/testphp/api/user.php");
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/testphp/api/logout.php");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>🏍️ Motore Dashboard</h1>
      
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.first_name} {user.last_name}!</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Gender: {user.gender}</p>
        </div>
      )}

      <div className="nav-links">
        <button onClick={() => navigate("/vehicles")}>🚗 View Vehicles</button>
        <button onClick={() => navigate("/add-vehicle")}>➕ Add Vehicle</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;