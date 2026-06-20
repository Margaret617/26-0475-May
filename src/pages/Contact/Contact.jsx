import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name || name.trim() === '') {
      return 'Name is required';
    }
    if (name.length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name can only contain letters and spaces';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === '') {
      return 'Email is required';
    }
    // Comprehensive email validation - removed unnecessary escapes
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g., name@domain.com)';
    }
    if (email.includes('..')) {
      return 'Email cannot contain consecutive dots';
    }
    if (email.startsWith('.') || email.endsWith('.')) {
      return 'Email cannot start or end with a dot';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone || phone.trim() === '') {
      return 'Phone number is required';
    }
    // Fixed regex - removed unnecessary escapes
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number (e.g., 123-456-7890)';
    }
    return '';
  };

  const validateGender = (gender) => {
    if (!gender || gender === '') {
      return 'Please select your gender';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'gender':
        error = validateGender(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      gender: validateGender(formData.gender)
    };

    const filteredErrors = {};
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key]) {
        filteredErrors[key] = newErrors[key];
      }
    });

    setErrors(filteredErrors);

    if (Object.keys(filteredErrors).length === 0) {
      console.log('Form Data:', formData);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          gender: ''
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="section-title">Contact</h1>
        <p className="section-subtitle">For collectors and media inquiries</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Whether you're a fellow collector, enthusiast, or member of the press, 
            we'd love to hear from you.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <span className="contact-value">collector@motore.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Location</span>
              <span className="contact-value">Monterey, California</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="example@domain.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            <small className="hint">Must be a valid email (e.g., name@domain.com)</small>
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="123-456-7890"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
            <small className="hint">Format: 123-456-7890</small>
          </div>

          <div className="form-group">
            <label htmlFor="gender">
              Gender <span className="required">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        {submitted && (
          <div className="success-message">
            <span>✅</span>
            <p>Thank you! Your information has been submitted successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;