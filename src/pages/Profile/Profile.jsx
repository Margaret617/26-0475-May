import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const getProfile = useCallback(async () => {
    // Get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user);

    // Fetch profile from Supabase
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProfile(data);
  }, [navigate]);

  useEffect(() => {
    getProfile();
  }, [getProfile]); // This is correct, but ESLint might still complain

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!profile) {
    return (
      <div className="profile-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>

        {user && (
          <p className="profile-email">
            Signed in as <strong>{user.email}</strong>
          </p>
        )}

        <div className="profile-info">
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;