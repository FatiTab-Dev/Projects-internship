import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layout/Navbar';
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
          </header> 
          {/* <main>
           
          </main>
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