import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layout/Navbar';
import { Home } from './Home';
import { Cart } from './Layout/Cart';
import { Login } from './Layout/Login';
import { Dashboard } from './Layout/Dashboard';
import { ProtectedRoute } from './Layout/ProtectedRoute';
import { ProductDetails } from './Layout/ProductDetails';
import { Checkout } from './Layout/Checkout';
import { Footer } from './Layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, [API]);

  const addToCart = (bike) => {
    setCartItems([...cartItems, bike]);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleFinalOrder = () => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((err) => console.error('Error updating stock from server:', err));
    
    setCartItems([]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartItems.length} user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home bikes={bikes} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard products={bikes} setProducts={setBikes} />} />
          </Route>

          <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} user={user} onCheckout={handleFinalOrder} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;