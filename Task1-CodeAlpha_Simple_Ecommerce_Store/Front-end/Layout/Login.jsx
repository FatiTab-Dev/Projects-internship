import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = ({onLogin}) => {
 
  const [activeTab, setActiveTab] = useState('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState({ text: '', type: '' });

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Sending request to:", `${API}/api/auth/login`);

  if (activeTab === 'login') {
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
 console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        setMessage({
          text: data.message || 'Invalid email or password',
          type: 'danger',
        });
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));

      if (onLogin) {
        onLogin(data.user);
      }

      setMessage({
        text: 'Welcome Back! 🎉',
        type: 'success',
      });

      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      setMessage({
        text: 'Server Error',
        type: 'danger',
      });
    }
  } else {
    try {
      const response = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({
          text: data.message,
          type: 'danger',
        });
        return;
      }

      setMessage({
        text: 'Account Created Successfully! 🚀',
        type: 'success',
      });

      setActiveTab('login');
      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      setMessage({
        text: 'Server Error',
        type: 'danger',
      });
    }
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow-sm border-0 rounded-4" style={{ width: '100%', maxWidth: '450px', backgroundColor: '#fff' }}>
        <div className="d-flex justify-content-center mb-4 border-bottom">
          <button 
            className={`btn fw-bold pb-2 px-4 rounded-0 border-0 ${activeTab === 'login' ? 'text-dark border-bottom border-3 border-dark' : 'text-muted'}`}
            style={{ fontSize: '1.1rem', transition: 'all 0.3s' }}
            onClick={() => setActiveTab('login')}
          >
           Login
          </button>
          <button 
            className={`btn fw-bold pb-2 px-4 rounded-0 border-0 ${activeTab === 'signup' ? 'text-dark border-bottom border-3 border-dark' : 'text-muted'}`}
            style={{ fontSize: '1.1rem', transition: 'all 0.3s' }}
            onClick={() => setActiveTab('signup')}
          >
            Sign up
          </button>
        </div>

        
        <form onSubmit={handleSubmit}>
          
          
          {activeTab === 'signup' && (
            <div className="mb-3 text-start position-relative">
              <label className="form-label small fw-bold text-muted ps-1">Name</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted"><i className="fas fa-user"></i></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 ps-0 py-2" 
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>
          )}

          
          <div className="mb-3 text-start">
            <label className="form-label small fw-bold text-muted ps-1">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted"><i className="fas fa-envelope"></i></span>
              <input 
                type="email" 
                className="form-control border-start-0 ps-0 py-2" 
                placeholder="Enter your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          
          <div className="mb-3 text-start">
            <label className="form-label small fw-bold text-muted ps-1">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted"><i className="fas fa-lock"></i></span>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control border-start-0 border-end-0 ps-0 py-2" 
                placeholder="Enter your password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <span 
                className="input-group-text bg-transparent border-start-0 text-muted" 
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
          </div>

          {activeTab === 'login' && (
            <div className="d-flex justify-content-between align-items-center small mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label text-muted" htmlFor="rememberMe">Stay connected</label>
              </div>
              <a href="#forgot" className="text-decoration-none fw-semibold" style={{ color: '#ff4000' }}>Password forgotten ?</a>
            </div>
          )}

          
          <button 
            type="submit" 
            className="btn w-100 rounded-pill fw-bold text-uppercase py-2.5 text-white shadow-sm mt-3"
            style={{ backgroundColor: '#ffff', color: '#ff4000', transition: 'all 0.3s' }}
          >
            <i className={activeTab === 'login' ? "fas fa-sign-in-alt me-2" : "fas fa-user-plus me-2"}></i>
            {activeTab === 'login' ? 'Login' : "Sign up"}
          </button>
        </form>

        
        <div className="text-center mt-4 small">
          <p className="text-muted mb-0">
            {activeTab === 'login' ? "New to our platform ? " : "Already have an account ? "}
            <span 
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')} 
              className="fw-bold text-decoration-underline"
              style={{ color: '#ff4000', cursor: 'pointer' }}
            >
              {activeTab === 'login' ? 'Create a new account' : 'Sign in here'}
            </span>
          </p>
          {message.text && (
           <div className={`alert alert-${message.type} text-center small py-2 mb-3`}>
           {message.text}
           </div>
)}
        </div>

      </div>
    </div>
  );
};