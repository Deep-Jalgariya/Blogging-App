import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/Register.css"
import { setAuthToken } from "../../utils/authUtils";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }
    try {
      const { data } = await axios.post(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );
      
      if (data.success && data.token) {
        setAuthToken(data.token);
        setTimeout(() => {
          navigate('/');
        }, 1800);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div className="modern-register-page">
      <div className="modern-register-card">
        <h2 className="modern-register-title">Create your account</h2>
        <p className="modern-register-subtitle">Sign up to get started with MERN Blog.</p>
        <form onSubmit={registerHandler} className="modern-register-form">
          {error && <div className="error_message">{error}</div>}
          <div className="input-wrapper">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              required
              id="name"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
              autoComplete="email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              autoComplete="new-password"
              placeholder="6+ strong character"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              required
              id="confirmpassword"
              autoComplete="new-password"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="modern-register-btn">Register</button>
        </form>
        <div className="modern-register-footer">
          <span>Have an account?</span>
          <a href="/login">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;