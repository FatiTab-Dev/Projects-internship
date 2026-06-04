import { Link, useNavigate } from 'react-router-dom';
 import { useState, useEffect } from 'react';
import api from '../api/axios';

export const Navbar = ({ setUser }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  const fetchUnread = async () => {
    try {
      const res = await api.get('/notifications/unread');
      setUnreadCount(res.data.count);
    } catch (err) {}
  };
  fetchUnread();
  const interval = setInterval(fetchUnread, 60000);
  return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <i className="fas fa-globe me-2"></i>SocialApp
        </Link>

        {/* Search Bar */}
        <div className="d-none d-md-flex mx-auto" style={{ width: '30%' }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-0">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>

            {/* Notifications */}
           <li className="nav-item">
               <Link className="nav-link position-relative" to="/notifications">
                 <i className="fas fa-bell"></i>
                  {unreadCount > 0 && (
                   <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.6rem' }}
                    >
                    {unreadCount}
                    </span>
                 )}
                </Link>
            </li>
            <li>
              <Link className="nav-link" to="/profile">
                 <i className="fas fa-user-circle me-2"></i> My Profile
              </Link>
            </li>

            {/* Divider */}
            <li className="nav-item">
              <span className="text-white-50">|</span>
            </li>

            {/* User Avatar + Name */}
            <li className="nav-item d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center fw-bold"
                style={{ width: 35, height: 35, fontSize: 16 }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-white d-none d-lg-inline">
                {user?.name || 'User'}
              </span>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};