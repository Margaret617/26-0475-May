import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const [touched, setTouched] = useState(false);

  const validate = () => {
    const errors = {};

    const nameRe = /^[A-Za-z]{2,}$/;
    if (!nameRe.test(firstName.trim())) errors.firstName = 'First name must be at least 2 letters.';
    if (!nameRe.test(lastName.trim())) errors.lastName = 'Last name must be at least 2 letters.';

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) errors.email = 'Enter a valid email address.';

    const phoneRe = /^\+?[0-9]{7,15}$/;
    if (!phoneRe.test(phone.trim())) errors.phone = 'Phone must be 7–15 digits (optional +).';

    // Password authentication removed.

    return errors;
  };

  const getFieldError = (field) => {
    const errors = validate();
    return errors[field] || '';
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    setError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setError('Please fix the highlighted fields.');
      return;
    }

    



    // Mark authenticated + unlock notes for this session
    localStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('notes_app_notes_unlocked_v1', 'true');

    // Optional: store user info
    localStorage.setItem('notes_app_user_v1', JSON.stringify({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      gender,
    }));

    // Private Notes page is no longer linked from the UI; stay on login.
    navigate('/login');

  };

  // If already authenticated, show a message instead of disappearing (login route should never render an empty page).
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-box">
            <h2>Already logged in</h2>
            <p>You’re authenticated.</p>
            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <button
                type="button"
                className="login-btn"
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  sessionStorage.removeItem('notes_app_notes_unlocked_v1');
                  navigate('/login');
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }





  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <p>Enter your details to access your private notes</p>


          
          <form onSubmit={handleSubmit}>
            <div className="login-grid">
              <div className="login-form-group">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                />
                {touched && getFieldError('firstName') && (
                  <p className="login-field-error">{getFieldError('firstName')}</p>
                )}
              </div>

              <div className="login-form-group">
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                />
                {touched && getFieldError('lastName') && (
                  <p className="login-field-error">{getFieldError('lastName')}</p>
                )}
              </div>

              <div className="login-form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                />
                {touched && getFieldError('email') && (
                  <p className="login-field-error">{getFieldError('email')}</p>
                )}
              </div>

              <div className="login-form-group">
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                />
                {touched && getFieldError('phone') && (
                  <p className="login-field-error">{getFieldError('phone')}</p>
                )}
              </div>

              <div className="login-form-group">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
                {touched && getFieldError('gender') && (
                  <p className="login-field-error">{getFieldError('gender')}</p>
                )}
              </div>


            </div>

            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn">
              Continue
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;