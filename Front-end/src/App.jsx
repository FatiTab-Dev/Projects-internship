import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layout/Navbar';
import { Carsoul } from './Layout/Carsoul';
import { Cardsshop } from './Layout/Cardsshop';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
         <Route path="/" element={
         <>
          <header>
            <Navbar />
            <Carsoul />
          </header> 
           <main>
           <Cardsshop />
          </main>
          {/*
          <footer>
            <Footer />
          </footer> */}
           
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