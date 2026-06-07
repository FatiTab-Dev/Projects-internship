import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const navigate = useNavigate();

  const primaryColor = '#4e73df';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeTab === 'login') {
        const res = await api.post('/users/login', { email, password });
        localStorage.setItem('user', JSON.stringify(res.data));

        if (onLogin) onLogin(res.data);
        navigate('/');
      } else {
        await api.post('/users/register', { name, email, password });
        setMessage({
          text: 'Account Created Successfully! 🚀',
          type: 'success',
        });
        setActiveTab('login');
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Error',
        type: 'danger',
      });
    }
  };

  return (
    <div
      className="login container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}
    >
      <div
        className="card p-4 shadow-lg border-0 rounded-4"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        {/* tab */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn fw-bold px-4 ${activeTab === 'login' ? 'text-primary border-bottom border-primary' : 'text-muted'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`btn fw-bold px-4 ${activeTab === 'signup' ? 'text-primary border-bottom border-primary' : 'text-muted'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
              ></i>
            </button>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold text-white mt-2"
            style={{ backgroundColor: primaryColor }}
          >
            {activeTab === 'login' ? 'Login' : 'Sign up'}
          </button>
        </form>

        {message.text && (
          <div className={`alert alert-${message.type} mt-3 small`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};
