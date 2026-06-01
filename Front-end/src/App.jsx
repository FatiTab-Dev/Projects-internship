import { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layout/Navbar';
import { Carsoul } from './Layout/Carsoul';
import { Cardsshop } from './Layout/Cardsshop';
import { Cart } from './Layout/Cart';
import { Login } from './Layout/Login';
import { Dashboard } from './Layout/Dashboard';
import { ProtectedRoute } from './Layout/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
 const [cartItems, setCartItems] = useState([]);
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
           <Cardsshop onAddToCart={addToCart} />
          </main>
           
          </>
        } />
        <Route path="/cart" element={
       <>
         <Navbar cartCount={cartItems.length} />
         <Cart cartItems={cartItems} />
          </>
          } />

          <Route path="/Login" element={ <Login onLogin={handleLogin} /> } />
          <Route element={
          <ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
         </Route>
          
      </Routes> 
    </div>
    </Router>
  );
}

export default App;