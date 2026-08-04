import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { 
      firstName, lastName, email, phone, gender, 
      username, password, confirmPassword 
    } = formData;

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting to register user...");

      // Step 1: Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            gender: gender,
          },
        },
      });

      if (authError) {
        console.error("Auth error:", authError);
        setError(authError.message || "Registration failed");
        setLoading(false);
        return;
      }

      if (!authData?.user) {
        setError("No user data returned. Please try again.");
        setLoading(false);
        return;
      }

      console.log("User created successfully:", authData.user.id);

      // Step 2: Insert profile into profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authData.user.id,
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            gender: gender,
          },
        ]);

      if (profileError) {
        console.error("Profile insert error:", profileError);
        
        let errorMessage = "Profile save failed: ";
        
        if (profileError.code === "42P01") {
          errorMessage += "The 'profiles' table does not exist. Please create it in Supabase.";
        } else if (profileError.code === "42501") {
          errorMessage += "Row-level security is blocking profile creation. Please add an INSERT policy for the 'profiles' table.";
        } else if (profileError.code === "23505") {
          errorMessage += "Username or email already exists. Please use different values.";
        } else {
          errorMessage += profileError.message || "Unknown error occurred.";
        }
        
        setError(errorMessage);
        setLoading(false);
        return;
      }

      console.log("Profile created successfully!");
      setSuccess("Account created successfully! Redirecting...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error. Please check your connection and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          <h2>Create Account</h2>
          <p>Register to start using Motore.</p>

          <form onSubmit={handleSubmit}>
            <div className="register-grid">
              <div className="register-form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="register-form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && <p className="register-error">{error}</p>}
            {success && <p className="register-success">{success}</p>}

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="register-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;