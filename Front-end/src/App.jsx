import { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layout/Navbar';
import { Carsoul } from './Layout/Carsoul';
import { Cardsshop } from './Layout/Cardsshop';
import { Cart } from './Layout/Cart';
import { Login } from './Layout/Login';
import { Dashboard } from './Layout/Dashboard';
import bikesData from './Layout/bikesData';
import { ProtectedRoute } from './Layout/ProtectedRoute';
import { ProductDetails } from './Layout/ProductDetails';
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
  const handleCheckout = (bikeId, quantity) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === bikeId ? { ...bike, stock: bike.stock - quantity, sales: bike.sales + quantity } : bike
      )
    );
  };

  return (
    <Router>
    <div className="App">
      <Routes>
         <Route path="/" element={
         <>
          <header>
            <Navbar cartCount={cartItems.length} />
            <Carsoul />
          </header> 
           <main>
           <Cardsshop bikes={bikes} onAddToCart={addToCart} />
          </main>
           
          </>
        } />
        <Route path="/cart" element={
       <>
         <Navbar cartCount={cartItems.length} />
         <Cart cartItems={cartItems} bikes={bikes} setBikes={setBikes} onCheckout={handleCheckout} />
          </>
          } />

          <Route path="/Login" element={ <Login onLogin={handleLogin} /> } />
          <Route element={
          <ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard products={bikes} setProducts={setBikes} />} />
          </Route>

          <Route path="/product/:id" element={<ProductDetails bikes={bikes} onAddToCart={addToCart} onCheckout={handleCheckout} />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;