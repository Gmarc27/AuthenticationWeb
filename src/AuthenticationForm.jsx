import React, { useState } from 'react';
import validator from 'validator';

const AuthenticationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('Weak');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    validatePassword(event.target.value);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()]/.test(password);
    const length = password.length;

    let strengthMessage = 'Weak';
    if (length >= 8 && (hasUpperCase + hasLowerCase + hasNumber + hasSpecialChar) >= 3) {
      strengthMessage = 'Strong';
    } else if (length >= 6 && (hasUpperCase + hasLowerCase + hasNumber + hasSpecialChar) >= 2) {
      strengthMessage = 'Moderate';
    }

    setPasswordStrength(strengthMessage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formData;

    
    if (validator.isEmail(email) && password.length > 0) {
      console.log('Valid credentials, sending to backend for authentication');
      
    } else {
      console.error('Invalid credentials');
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <span>Password Strength: {passwordStrength}</span>

      <button type="submit">Login</button>
    </form>
  );
};

export default AuthenticationForm;