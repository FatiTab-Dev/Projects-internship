import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/notifications');
         console.log('Notifications response:', res.data);
        setNotifications(res.data);
        await api.put('/notifications/read');
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

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

  const handleClick = (notif) => {
    if (notif.type === 'follow') {
      navigate(`/profile/${notif.sender?._id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 700 }}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">

          {/* Header */}
          <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">
              <i className="fas fa-bell me-2 text-primary"></i>
              Notifications
            </h5>
            {notifications.length > 0 && (
              <span className="badge bg-primary rounded-pill">
                {notifications.length}
              </span>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-center py-5">Loading...</p>
          ) : notifications.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-bell-slash text-muted mb-3" style={{ fontSize: 40 }}></i>
              <p className="text-muted">No notifications yet</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif._id}
                onClick={() => handleClick(notif)}
                className={`d-flex align-items-center gap-3 px-4 py-3 border-bottom ${!notif.read ? 'bg-light' : ''}`}
                style={{ cursor: 'pointer', transition: '0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = notif.read ? 'white' : '#f8f9fa'}
              >
                {/* Avatar */}
                <Link
                  to={`/profile/${notif.sender?._id}`}
                  onClick={e => e.stopPropagation()}
                  className="text-decoration-none flex-shrink-0"
                >
                  <div
                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white overflow-hidden"
                    style={{ width: 50, height: 50, fontSize: 20 }}
                  >
                    {notif.sender?.profilePicture
                      ? <img
                          src={`http://localhost:5000${notif.sender.profilePicture}`}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      : notif.sender?.name?.charAt(0).toUpperCase()
                    }
                  </div>
                </Link>

                {/* Content */}
                <div className="flex-grow-1">
                  <p className="mb-1 small">{getText(notif)}</p>
                  {/* إلا كان like أو comment كيبان النص ديال البوست */}
                  {notif.post?.text && (
                    <p className="mb-1 text-muted small bg-white rounded p-1 border">
                      "{notif.post.text.slice(0, 60)}{notif.post.text.length > 60 ? '...' : ''}"
                    </p>
                  )}
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                    <i className="fas fa-clock me-1"></i>
                    {timeAgo(notif.createdAt)}
                  </span>
                </div>

                {/* Type Icon + unread dot */}
                <div className="d-flex flex-column align-items-center gap-2">
                  <div style={{ fontSize: 18 }}>{getIcon(notif.type)}</div>
                  {!notif.read && (
                    <div
                      className="rounded-circle bg-primary"
                      style={{ width: 8, height: 8 }}
                    ></div>
                  )}
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};