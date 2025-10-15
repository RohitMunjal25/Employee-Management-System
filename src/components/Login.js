import React, { useState } from 'react';
import api from './Apicall';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'; 
import './styling/login.css'

export default function AuthPage() {
  const navigate = useNavigate(); 
  const [view, setView] = useState('main');
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', {
        userName: formData.username,
        password: formData.password,
      });
      localStorage.setItem('token', res.data.token);
      
      swal("Success!", "Logged in successfully!", "success")
        .then(() => {
          navigate('/front'); 
        });
    } catch (err) {
      swal("Error!", "Invalid username or password.", "error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', {
        userName: formData.username,
        password: formData.password,
      });
      swal("Success!", "Registration successful! Please log in.", "success")
        .then(() => setView('login'));
    } catch (err) {
      swal("Error!", "Username may already be taken.", "error");
    }
  };

  if (view === 'login') {
    return (
      <div className="auth-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input name="username" type="text" placeholder="Username" required onChange={handleInputChange} />
          <input name="password" type="password" placeholder="Password" required onChange={handleInputChange} />
          <button type="submit">Log In</button>
        </form>
        <button className="back-button" onClick={() => setView('main')}>Back</button>
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="auth-form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <input name="username" type="text" placeholder="Username" required onChange={handleInputChange} />
          <input name="password" type="password" placeholder="Password" required onChange={handleInputChange} />
          <button type="submit">Create Account</button>
        </form>
        <button className="back-button" onClick={() => setView('main')}>Back</button>
      </div>
    );
  }

  return (
    <div className="login-page-container">
      <h2>Welcome to Employee Management System Demo</h2>
      <p>Please log in or register to continue.</p>
      <div className="auth-buttons">
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('register')}>Register</button>
      </div>
    </div>
  );
}