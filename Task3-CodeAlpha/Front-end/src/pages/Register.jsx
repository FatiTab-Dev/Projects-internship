import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  //    const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.message || 'Error', type: 'danger' });
        return;
      }
      setMessage({ text: 'Account Created Successfully! 🚀', type: 'success' });
      setTimeout(() => navigate('/login'), 1500);
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
      style={{ minHeight: '100vh' }}
    >
      <div
        className="card auth-card"
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <h1 className="text-center">sing in</h1>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="name"></label>
          <input
            className="form-control"
            type="text"
            value={name}
            name="name"
            id="name"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <label className="label" htmlFor="email"></label>
          <input
            className="form-control"
            type="email"
            value={email}
            name="email"
            id="email"
            placeholder="youremail@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <label
            className="label"
            htmlFor="password"
            htmlFor="password"
          ></label>
          <input
            className="form-control"
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button
            className="btn btn-outline-info mt-3"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button type="submit" className="btn btn-outline-info mt-3 mx-4">
            Sing in
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

export default Register;
