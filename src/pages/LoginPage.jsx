import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import loginIllustration from '../assets/logotitle.svg';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ImGoogle3 } from "react-icons/im";
import { login,putAccessToken } from '../utils/network-data'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    console.log("ini username yang diterima", username);
    console.log("ini password yang diterima",password)

    if(!username || !password){
      alert("plis masukin username atau passwordnya")
      return
    }
    const { error, data } = await login({username, password});
  
    if(!error){
      putAccessToken(data)
      console.log("ini tokennya", data)
      navigate('/dashboard')
    }else {
      alert('Login gagal, periksa kembali user dan password')
    }
  };

  // const handleGoogleLogin = () => {
  //   console.log('Google login clicked');
  // };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="wave-pattern"></div>
        <div className="login-illustration">
          <img 
            src={loginIllustration} 
            alt="Login Illustration" 
            className="illustration-image"
          />
        </div>
        <div className="brand-text">
          <p>Permudah tugas dan tingkatkan produktivitasmu.</p>
          <br></br>
          <p>Mulai sekarang, gratis!</p>
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-form">
          <h1 className="welcome-title">Selamat Datang!</h1>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-button">
              Masuk
            </button>
          </form>
          
          <div className="register-prompt">
            <span>Belum punya akun? </span>
            <Link to="/register" className="register-link">Daftar di sini</Link>
          </div>
          
          {/* <div className="divider">
            <span>Masuk dengan Google</span>
          </div> */}
{/*           
          <button className="google-login-button" onClick={handleGoogleLogin}>
                  <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
