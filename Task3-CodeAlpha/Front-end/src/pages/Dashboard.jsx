import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const [project, setProject] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { token, logout, notifications, setNotifications } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [invitingProject, setInvitingProject] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  useEffect(() => {
    fetch(`${API}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProject(Array.isArray(data) ? data : []))
      .catch(() =>
        setMessage({ text: 'Error fetching projects', type: 'danger' })
      );
  }, [API, token]);

  const creatProject = async () => {
    try {
      const res = await fetch(`${API}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, description: newDesc }),
      });
      const data = await res.json();
      setProject((prev) => [data, ...prev]);
      setShowModal(false);
      setNewTitle('');
      setNewDesc('');
    } catch {
      setMessage({ text: 'Error creating project', type: 'danger' });
    }
  };
  const deleteProject = async (projectId) => {
    try {
      await fetch(`${API}/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProject((prev) => prev.filter((p) => p._id !== projectId));
    } catch {
      setMessage({ text: 'Error deleting project', type: 'danger' });
    }
  };
  const inviteMember = async () => {
    try {
      const res = await fetch(`${API}/projects/${invitingProject}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: inviteEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.message || 'Error', type: 'danger' });
        return;
      }
      setMessage({ text: 'Member invited successfully! 🎉', type: 'success' });
      setInvitingProject(null);
      setInviteEmail('');
    } catch (err) {
      console.log(err);
      setMessage({ text: 'Error inviting member', type: 'danger' });
    }
  };
  const updateProject = async () => {
    try {
      const res = await fetch(`${API}/projects/${editingProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, description: newDesc }),
      });
      const data = await res.json();
      setProject((prev) =>
        prev.map((p) => (p._id === editingProject._id ? data : p))
      );
      setEditingProject(null);
      setNewTitle('');
      setNewDesc('');
    } catch {
      setMessage({ text: 'Error updating project', type: 'danger' });
    }
  };
  useEffect(() => {
    fetch(`${API}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotifications(data);
        }
      });
  }, [API, token, setNotifications]);
  const markAsRead = async (notificationId) => {
    try {
      await fetch(`${API}/notifications/${notificationId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
    } catch {
      console.log('Error marking as read');
    }
  };
  const handleLogout = () => {
    logout();
    navigate('login');
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg shadow-sm sticky-top">
        <div className="container d-flex align-items-center justify-content-start gap-2">
          <div className="position-relative">
            <button
              className="btn btn-outline-info btn-sm position-relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div
                className="card position-absolute p-2"
                style={{ width: '300px', zIndex: 1000, top: '40px' }}
              >
                {notifications.length === 0 ? (
                  <p className="text-center small">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className="p-2 border-bottom small d-flex justify-content-between align-items-center"
                    >
                      <span>{n.message || n.text}</span>
                      {!n.read && (
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => markAsRead(n._id)}
                        >
                          ✓
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <button
            className="btn btn-outline-info"
            onClick={() => setShowModal(true)}
          >
            Create Project
          </button>
          <button
            className="btn btn-outline-info btn-sm ms-auto"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      {message.text && (
        <div className={`alert alert-${message.type} mt-3 small`}>
          {message.text}
        </div>
      )}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Project</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-outline-info" onClick={creatProject}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row mt-4">
        {project.map((p) => (
          <div key={p._id} className="col-md-4 mb-3">
            <div className="card p-3">
              <h5
                onClick={() => navigate(`/project/${p._id}`)}
                style={{ cursor: 'pointer' }}
              >
                {p.title}
              </h5>
              <p>{p.description}</p>
              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingProject(p);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(p._id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInvitingProject(p._id);
                  }}
                >
                  Invite
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Invite Modal */}
        {invitingProject && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Invite Member</h5>
                  <button
                    className="btn-close"
                    onClick={() => setInvitingProject(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    className="form-control"
                    placeholder="Email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setInvitingProject(null)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-info" onClick={inviteMember}>
                    Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingProject && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Project</h5>
                  <button
                    className="btn-close"
                    onClick={() => setEditingProject(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setEditingProject(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline-info"
                    onClick={updateProject}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
