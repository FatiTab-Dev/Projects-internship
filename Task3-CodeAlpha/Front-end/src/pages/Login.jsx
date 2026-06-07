import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState(''); 
//    const [showPassword, setShowPassword] = useState(false);
   const [message, setMessage] = useState({ text: '', type: '' });
   const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   const { login } = useAuth();
   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify({email, password})
       });
       const data = await res.json();
       if (!res.ok) {
       setMessage({ text: data.message || 'Error', type: 'danger' });
       return;
       }

       login(data.user, data.token);
       navigate('/');
      } catch (error) {
        setMessage({ 
        text: error.response?.data?.message || 'Error', 
        type: 'danger' 
      });
    }
  };
  return(
  <div className='login container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh'}}>
    <div className='card my-5 mx-4 p-5 ' style={{ width: '100%', maxWidth: '450px'}}>
        <h1 className='text-center mb-4'>Login</h1>
        <form onSubmit={handleSubmit}>
            <input className="form-control" type='email'value={email} name='email' id="floatingInput" placeholder="youremail@gmail.com" onChange={(e) => setEmail(e.target.value)} required ></input>
            <label className="label" htmlFor="floatingInput"></label>
            <input className="form-control" value={password} type="password" name='password' id='floatingPassword' placeholder='**********' onChange={(e) => setPassword(e.target.value)} required ></input>
            <label className='label' htmlFor='floatingPassword'></label>
            <button type="button" className="btn btn-outline-info mt-3" onClick={() => navigate('/register')}>Sign in</button>
            <button type="submit" className="btn btn-outline-info mt-3 mx-4">Login</button>
        </form>
        {message.text && <div className={`alert alert-${message.type} mt-3 small`}>{message.text}</div>}
    </div>
 </div>
  )
};

 export default Login