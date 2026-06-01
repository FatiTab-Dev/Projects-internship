import { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layout/Navbar';
import { Home } from './Home';
import { Cart } from './Layout/Cart';
import { Login } from './Layout/Login';
import { Dashboard } from './Layout/Dashboard';
import bikesData from './Layout/bikesData';
import { ProtectedRoute } from './Layout/ProtectedRoute';
import { ProductDetails } from './Layout/ProductDetails';
import { Checkout } from './Layout/Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
 const [cartItems, setCartItems] = useState([]);
 const [bikes, setBikes] = useState(bikesData);
   const [user, setUser] = useState(() => {
   const savedUser = localStorage.getItem('user');
   return savedUser ? JSON.parse(savedUser) : null;
 });
 
  const addToCart = (bike) => {
   setCartItems([...cartItems, bike]);
 };
 const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const handleCheckout = (bikeId, quantity) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === bikeId ? { ...bike, stock: bike.stock - quantity, sales: bike.sales + quantity } : bike
      )
    );
  };
  const handleFinalOrder = () => {
    cartItems.forEach((item) => {
      handleCheckout(item.id, 1);
    });
    setCartItems([]);
  };
  

  return (
    <Router>
    <div className="App">
       <Navbar cartCount={cartItems.length} user={user} onLogout={handleLogout} />
      <Routes>
         <Route path="/" element={
         <>
          <Home bikes={bikes} onAddToCart={addToCart} />
          </>
        } />

         <Route path="/cart" element={
         <Cart cartItems={cartItems} bikes={bikes} setBikes={setBikes} onCheckout={handleCheckout} />
        } />
       
        <Route path="/Login" element={ <Login onLogin={handleLogin} /> } />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/dashboard" element={
              <>
                <Dashboard products={bikes} setProducts={setBikes} />
              </>
            } />
          </Route>

          <Route path="/product/:id" element={
            <>
             
              <ProductDetails bikes={bikes} onAddToCart={addToCart} onCheckout={handleCheckout} />
            </>
          } />
        <Route path="/checkout" element={
            <>
             
              <Checkout cartItems={cartItems} user={user} onCheckout={handleFinalOrder} />
            </>
          } />
          </Routes>
      </div>
    </Router>
  );
}

export default App;