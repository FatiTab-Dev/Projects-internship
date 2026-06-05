import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';

export const Navbar = ({ setUser }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userData = currentUser?.user;

  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUnread = async () => {
    try {
      const res = await api.get('/notifications/unread');
      setUnreadCount(res.data.count);
    } catch (err) { console.error('Unread error:', err.response?.data || err.message);}
  };

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
      // mark as read
      await api.put('/notifications/read');
      setUnreadCount(0);
    } catch (err) { console.error('Unread error:', err.response?.data || err.message);}
  };

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleBellClick = () => {
    setShowDropdown(prev => !prev);
    if (!showDropdown) fetchNotifications();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'like':    return <i className="fas fa-thumbs-up text-primary"></i>;
      case 'comment': return <i className="fas fa-comment text-success"></i>;
      case 'follow':  return <i className="fas fa-user-plus text-warning"></i>;
      default:        return null;
    }
  };

  const getText = (notif) => {
    switch (notif.type) {
      case 'like':    return <><b>{notif.sender?.name}</b> liked your post</>;
      case 'comment': return <><b>{notif.sender?.name}</b> commented on your post</>;
      case 'follow':  return <><b>{notif.sender?.name}</b> started following you</>;
      default:        return null;
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
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
            <input type="text" className="form-control border-0" placeholder="Search..." />
          </div>
        </div>

        {/* Toggler */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>

            {/* Notifications Dropdown */}
            <li className="nav-item position-relative" ref={dropdownRef}>
              <span
                className="nav-link position-relative"
                style={{ cursor: 'pointer' }}
                onClick={handleBellClick}
              >
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </span>

              {/* Dropdown */}
              {showDropdown && (
                <div
                  className="position-absolute bg-white rounded shadow-lg"
                  style={{
                    width: 350,
                    right: 0,
                    top: '110%',
                    zIndex: 1000,
                    maxHeight: 400,
                    overflowY: 'auto'
                  }}
                >
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                    <h6 className="mb-0 fw-bold">Notifications</h6>
                    <Link
                      to="/notifications"
                      className="text-primary small text-decoration-none"
                      onClick={() => setShowDropdown(false)}
                    >
                      See all
                    </Link>
                  </div>

                  {/* List */}
                  {notifications.length === 0 ? (
                    <p className="text-center text-muted small py-4">No notifications yet</p>
                  ) : (
                    notifications.slice(0, 8).map(notif => (
                      <div
                        key={notif._id}
                        className={`d-flex align-items-center gap-3 px-3 py-2 border-bottom ${!notif.read ? 'bg-light' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setShowDropdown(false);
                          if (notif.type === 'follow') {
                            navigate(`/profile/${notif.sender?._id}`);
                          } else {
                            navigate('/');
                          }
                        }}
                      >
                        {/* Avatar */}
                        <div
                          className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white overflow-hidden flex-shrink-0"
                          style={{ width: 40, height: 40, fontSize: 16 }}
                        >
                          {notif.sender?.profilePicture
                            ? <img src={`http://localhost:5000${notif.sender.profilePicture}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : notif.sender?.name?.charAt(0).toUpperCase()
                          }
                        </div>

                        {/* Content */}
                        <div className="flex-grow-1">
                          <p className="mb-0 small">{getText(notif)}</p>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                            {timeAgo(notif.createdAt)}
                          </span>
                        </div>

                        {/* Type Icon */}
                        <div>{getIcon(notif.type)}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </li>

            {/* My Profile */}
            <li className="nav-item">
              <Link className="nav-link" to={`/profile/${userData?.id}`}>
                <i className="fas fa-user-circle me-1"></i> My Profile
              </Link>
            </li>

            {/* Divider */}
            <li className="nav-item">
              <span className="text-white-50">|</span>
            </li>

            {/* Avatar + Name */}
            <li className="nav-item d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center fw-bold overflow-hidden"
                style={{ width: 35, height: 35, fontSize: 16 }}
              >
                {userData?.profilePicture ? (
                  <img src={`http://localhost:5000${userData.profilePicture}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  userData?.name?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <span className="text-white d-none d-lg-inline">
                {userData?.name || 'User'}
              </span>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};