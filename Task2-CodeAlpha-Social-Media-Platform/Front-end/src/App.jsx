import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Login } from './layout/Login';
import { Navbar } from './layout/Navbar';
import { Home } from './layout/Home';
import { Profile } from './layout/Profile';
import { UserProfile } from './layout/UserProfile';
import { Notifications } from './layout/Notifications';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <div className="App">
        {user && <Navbar setUser={setUser} />}

        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={!user ? <Login onLogin={setUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userId"
            element={user ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={user ? <Notifications /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
