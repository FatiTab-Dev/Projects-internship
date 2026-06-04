import { useState, useEffect } from 'react';
import api from '../api/axios';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // edit post
  const [editingPost, setEditingPost] = useState(null);
  const [editPostText, setEditPostText] = useState('');

  // profile form
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = useState(currentUser?.user?.name || '');
  const [bio, setBio] = useState(currentUser?.user?.bio || '');
  const [profileImage, setProfileImage] = useState(null);

  const fetchUserPosts = async () => {
    try {
      setLoadingPosts(true);
      const res = await api.get(`/posts/user/${currentUser?.user?.id}`);
      setUserPosts(res.data);
      setLoadingPosts(false);
    } catch (err) {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  // ── Update Profile ──
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (profileImage) formData.append('image', profileImage);

    try {
      const res = await api.put('/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // update localStorage
      const updatedUser = {
        ...currentUser,
        user: {
          ...currentUser.user,
          name: res.data.name,
          bio: res.data.bio,
          profilePicture: res.data.profilePicture
        }
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage({ text: 'Profile updated!', type: 'success' });
      setEditMode(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: 'Failed to update profile', type: 'danger' });
    }
  };

  // ── Delete Post ──
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${postId}`);
      fetchUserPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  // ── Edit Post ──
  const handleEditPost = async (postId) => {
    try {
      await api.put(`/posts/${postId}`, { text: editPostText });
      setEditingPost(null);
      setEditPostText('');
      fetchUserPosts();
    } catch (err) {
      console.error('Error editing post:', err);
    }
  };

  const profilePic = currentUser?.user?.profilePicture
    ? `http://localhost:5000${currentUser.user.profilePicture}`
    : null;

  return (
    <div className=" profile container mt-5" style={{ maxWidth: 800 }}>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">

          {!editMode ? (
            // ── View Mode ──
            <div className="d-flex align-items-center gap-4">
              {/* Avatar */}
              <div
                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white flex-shrink-0 overflow-hidden"
                style={{ width: 80, height: 80, fontSize: 32 }}
              >
                {profilePic
                  ? <img src={profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : currentUser?.user?.name?.charAt(0).toUpperCase()
                }
              </div>
              {/* Info */}
              <div className="flex-grow-1">
                <h4 className="mb-1">{currentUser?.user?.name}</h4>
                <p className="text-muted mb-2">{currentUser?.user?.bio || 'No bio yet'}</p>
                <span className="badge bg-primary">{userPosts.length} Posts</span>
              </div>
              {/* Edit Button */}
              <button className="btn btn-outline-primary btn-sm" onClick={() => setEditMode(true)}>
                <i className="fas fa-edit me-1"></i> Edit Profile
              </button>
            </div>

          ) : (
            // ── Edit Mode ──
            <form onSubmit={handleUpdateProfile}>
              <h5 className="mb-3">Edit Profile</h5>

              {/* Profile Picture */}
              <div className="mb-3 text-center">
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white mx-auto mb-2 overflow-hidden"
                  style={{ width: 80, height: 80, fontSize: 32 }}
                >
                  {profileImage
                    ? <img src={URL.createObjectURL(profileImage)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : profilePic
                    ? <img src={profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : currentUser?.user?.name?.charAt(0).toUpperCase()
                  }
                </div>
                <input
                  type="file"
                  className="form-control form-control-sm"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>

              <div className="mb-2">
                <label className="form-label small fw-bold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Bio</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Write something about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2 mb-5">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save me-1"></i> Save
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>

              {message.text && (
                <div className={`alert alert-${message.type} mt-3 small`}>{message.text}</div>
              )}
            </form>
          )}

        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4 mt-5">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <i className="fas fa-th me-1"></i> My Posts
          </button>
        </li>
      </ul>

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        loadingPosts ? (
          <p className="mt-5 text-center">Loading posts...</p>
        ) : userPosts.length === 0 ? (
          <p className="text-center text-muted">No posts yet.</p>
        ) : (
          userPosts.map(post => (
            <div key={post._id} className="card mb-3 border-0 shadow-sm">
              <div className="card-body">

                {editingPost === post._id ? (
                  // ── Edit Post Mode ──
                  <div>
                    <textarea
                      className="form-control mb-2"
                      rows={3}
                      value={editPostText}
                      onChange={(e) => setEditPostText(e.target.value)}
                    />
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary btn-sm" onClick={() => handleEditPost(post._id)}>
                        <i className="fas fa-save me-1"></i> Save
                      </button>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditingPost(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>

                ) : (
                  // ── View Post Mode ──
                  <>
                    <div className="d-flex justify-content-between align-items-start">
                      <p className="card-text">{post.text}</p>
                      {/* Edit/Delete Buttons */}
                      <div className="d-flex gap-2 ms-3">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            setEditingPost(post._id);
                            setEditPostText(post.text);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    {post.image && (
                      <img
                        src={`http://localhost:5000${post.image}`}
                        className="img-fluid rounded mt-2"
                        alt="post"
                      />
                    )}

                    <div className="d-flex gap-3 mt-2 text-muted small">
                      <span><i className="fas fa-thumbs-up me-1"></i>{post.likes?.length || 0} Likes</span>
                      <span><i className="fas fa-comment me-1"></i>{post.comments?.length || 0} Comments</span>
                    </div>
                  </>
                )}

              </div>
            </div>
          ))
        )
      )}

    </div>
  );
};