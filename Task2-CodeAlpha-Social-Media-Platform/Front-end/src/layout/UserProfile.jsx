import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export const UserProfile = () => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isOwnProfile = currentUser?.user?.id === userId;

  const fetchData = async () => {
    try {
      const [userRes, postsRes, followersRes, followingRes] = await Promise.all([
        api.get(`/users/${userId}`),
        api.get(`/posts/user/${userId}`),
        api.get(`/users/${userId}/followers`),
        api.get(`/users/${userId}/following`)
      ]);
      setProfileUser(userRes.data);
      setUserPosts(postsRes.data);
      setFollowers(followersRes.data);
      setFollowing(followingRes.data);

      const alreadyFollowing = followersRes.data.some(
        f => f._id === currentUser?.user?.id
      );
      setIsFollowing(alreadyFollowing);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleFollow = async () => {
    try {
      const res = await api.post(`/users/${userId}/follow`);
      setIsFollowing(res.data.isFollowing);
      fetchData();
    } catch (err) {
      console.error('Follow error:', err.response?.data || err.message);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;
    try {
      await api.post(`/posts/${postId}/comment`, { text: commentText[postId] });
      setCommentText(prev => ({ ...prev, [postId]: '' }));
      fetchData();
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!profileUser) return <p className="text-center mt-5">User not found</p>;

  const profilePic = profileUser.profilePicture
    ? `http://localhost:5000${profileUser.profilePicture}`
    : null;

  return (
    <div className="container mt-5" style={{ maxWidth: 800 }}>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-4">

            {/* Avatar */}
            <div
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white flex-shrink-0 overflow-hidden"
              style={{ width: 90, height: 90, fontSize: 36 }}
            >
              {profilePic
                ? <img src={profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : profileUser.name?.charAt(0).toUpperCase()
              }
            </div>

            {/* Info */}
            <div className="flex-grow-1">
              <h4 className="mb-1">{profileUser.name}</h4>
              <p className="text-muted mb-2">{profileUser.bio || 'No bio yet'}</p>

              {/* Stats */}
              <div className="d-flex gap-4">
                <div className="text-center" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('posts')}>
                  <div className="fw-bold">{userPosts.length}</div>
                  <div className="text-muted small">Posts</div>
                </div>
                <div className="text-center" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('followers')}>
                  <div className="fw-bold">{followers.length}</div>
                  <div className="text-muted small">Followers</div>
                </div>
                <div className="text-center" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('following')}>
                  <div className="fw-bold">{following.length}</div>
                  <div className="text-muted small">Following</div>
                </div>
              </div>
            </div>

            {/* Follow / Edit */}
            {isOwnProfile ? (
              <Link to="/profile" className="btn btn-outline-primary btn-sm">
                <i className="fas fa-edit me-1"></i> Edit Profile
              </Link>
            ) : (
              <button
                onClick={handleFollow}
                className={`btn btn-sm ${isFollowing ? 'btn-outline-secondary' : 'btn-primary'}`}
              >
                {isFollowing
                  ? <><i className="fas fa-user-minus me-1"></i> Unfollow</>
                  : <><i className="fas fa-user-plus me-1"></i> Follow</>
                }
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
            <i className="fas fa-th me-1"></i> Posts
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'followers' ? 'active' : ''}`} onClick={() => setActiveTab('followers')}>
            <i className="fas fa-users me-1"></i> Followers ({followers.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'following' ? 'active' : ''}`} onClick={() => setActiveTab('following')}>
            <i className="fas fa-user-check me-1"></i> Following ({following.length})
          </button>
        </li>
      </ul>

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        userPosts.length === 0 ? (
          <p className="text-center text-muted">No posts yet.</p>
        ) : (
          userPosts.map(post => (
            <div key={post._id} className="card mb-3 border-0 shadow-sm">
              <div className="card-body">
                <p className="card-text">{post.text}</p>
                {post.image && (
                  <img src={`http://localhost:5000${post.image}`} className="img-fluid rounded mb-2" alt="post" />
                )}

                {/* Stats */}
                <div className="d-flex gap-3 text-muted small mb-2">
                  <span><i className="fas fa-thumbs-up me-1"></i>{post.likes?.length || 0} Likes</span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleComments(post._id)}
                  >
                    <i className="fas fa-comment me-1"></i>{post.comments?.length || 0} Comments
                  </span>
                </div>

                {/* Comments Section */}
                {showComments[post._id] && (
                  <div className="mt-2">
                    {/* Comments List */}
                    {post.comments?.map(comment => (
                      <div key={comment._id} className="d-flex align-items-start mb-2">
                        <div
                          className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white flex-shrink-0 me-2"
                          style={{ width: 30, height: 30, fontSize: 13 }}
                        >
                          {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="bg-light rounded-3 p-2 w-100">
                          <Link
                            to={`/profile/${comment.user?._id}`}
                            className="text-decoration-none text-dark fw-bold small"
                          >
                            {comment.user?.name || 'User'}
                          </Link>
                          <p className="mb-0 small">{comment.text}</p>
                        </div>
                      </div>
                    ))}

                    {/* Add Comment */}
                    <div className="d-flex gap-2 mt-2">
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-pill"
                        placeholder="Write a comment..."
                        value={commentText[post._id] || ''}
                        onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id)}
                      />
                      <button
                        className="btn btn-primary btn-sm rounded-pill px-3"
                        onClick={() => handleComment(post._id)}
                      >
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )
      )}

      {/* Followers Tab */}
      {activeTab === 'followers' && (
        followers.length === 0 ? (
          <p className="text-center text-muted">No followers yet.</p>
        ) : (
          followers.map(user => (
            <Link key={user._id} to={`/profile/${user._id}`} className="text-decoration-none">
              <div className="card mb-2 border-0 shadow-sm">
                <div className="card-body d-flex align-items-center gap-3 py-2">
                  <div
                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white overflow-hidden flex-shrink-0"
                    style={{ width: 45, height: 45 }}
                  >
                    {user.profilePicture
                      ? <img src={`http://localhost:5000${user.profilePicture}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : user.name?.charAt(0).toUpperCase()
                    }
                  </div>
                  <div>
                    <div className="fw-bold text-dark">{user.name}</div>
                    <div className="text-muted small">{user.bio || 'No bio'}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )
      )}

      {/* Following Tab */}
      {activeTab === 'following' && (
        following.length === 0 ? (
          <p className="text-center text-muted">Not following anyone yet.</p>
        ) : (
          following.map(user => (
            <Link key={user._id} to={`/profile/${user._id}`} className="text-decoration-none">
              <div className="card mb-2 border-0 shadow-sm">
                <div className="card-body d-flex align-items-center gap-3 py-2">
                  <div
                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white overflow-hidden flex-shrink-0"
                    style={{ width: 45, height: 45 }}
                  >
                    {user.profilePicture
                      ? <img src={`http://localhost:5000${user.profilePicture}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : user.name?.charAt(0).toUpperCase()
                    }
                  </div>
                  <div>
                    <div className="fw-bold text-dark">{user.name}</div>
                    <div className="text-muted small">{user.bio || 'No bio'}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )
      )}

    </div>
  );
};