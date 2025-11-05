import { useState } from "react";
import axios from "axios";
import "../../Css/Login.css"
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils/authUtils";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/auth/login",
        { email, password }
      );
      
      if (data.success && data.token) {
        setAuthToken(data.token);
        setTimeout(() => {
          navigate("/");
        }, 1800);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 4500);
    }
  };

  return (
    <div className="modern-login-page">
      <div className="modern-login-card">
        <h2 className="modern-login-title">Sign in to your account</h2>
        <p className="modern-login-subtitle">Welcome back! Please enter your details.</p>
        <form onSubmit={loginHandler} className="modern-login-form">
          {error && <div className="error_message">{error}</div>}
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
              autoComplete="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              autoComplete="current-password"
              placeholder="6+ strong character"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
            />
          </div>
          <Link to="#" className="modern-forgotpassword">Forgot Password?</Link>
          <button type="submit" className="modern-login-btn">Login</button>
        </form>
        <div className="modern-login-footer">
          <span>Don't have an account?</span>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;