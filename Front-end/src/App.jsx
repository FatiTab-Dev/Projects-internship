import { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layout/Navbar';
import { Carsoul } from './Layout/Carsoul';
import { Cardsshop } from './Layout/Cardsshop';
import { Cart } from './Layout/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
 const [cartItems, setCartItems] = useState([]);
 const addToCart = (bike) => {
   setCartItems([...cartItems, bike]);
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
          {/*
          <footer>
            <Footer />
          </footer> */}
           
          </>
        } />;
        <Route path="/cart" element={
       <>
         <Navbar cartCount={cartItems.length} />
         <Cart cartItems={cartItems} />
          </>
          } />
        {/* <Route path="/Login" element={ <Login /> } />
        <Route path="/Dashbord" element={
          <ProtectedRoute>
            <Dashbord updateCV={updateCV} cvFile={cvFile} />
          </ProtectedRoute>
          } />*/}
      </Routes> 
    </div>
    </Router>
  );
}

export default App;