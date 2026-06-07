import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append('text', content);
    if (image) formData.append('image', image);

    try {
      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setContent('');
      setImage(null);
      setMessage({ text: 'Posted successfully!', type: 'success' });
      fetchPosts();
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: 'Failed to post', type: 'danger' });
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;
    try {
      await api.post(`/posts/${postId}/comment`, { text: commentText[postId] });
      setCommentText((prev) => ({ ...prev, [postId]: '' }));
      fetchPosts();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const isLiked = (post) => {
    return post.likes?.includes(currentUser?.user?.id);
  };

  return (
    <div
      className="home container mt-5"
      style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}
    >
      <div className="row">
        {/* ── Sidebar ── */}
        <div className="col-md-3 d-none d-md-block">
          <div className="card border-0 shadow-sm p-3">
            {/* User Info */}
            <div className="d-flex align-items-center mb-3">
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white me-2 flex-shrink-0"
                style={{ width: 45, height: 45, fontSize: 20 }}
              >
                {currentUser?.user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h6 className="mb-0">{currentUser?.user?.name}</h6>
                <small className="text-muted">Welcome back 👋</small>
              </div>
            </div>

            <hr />

            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to={`/profile/${currentUser?.user?.id}`}
                  className="text-decoration-none text-dark d-flex align-items-center gap-2"
                >
                  <i className="fas fa-user-circle text-primary"></i> My Profile
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/profile"
                  className="text-decoration-none text-dark d-flex align-items-center gap-2"
                >
                  <i className="fas fa-edit text-primary"></i> Edit Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Feed ── */}
        <div className="col-md-6">
          {/* Create Post */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ width: 38, height: 38 }}
                >
                  {currentUser?.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <textarea
                  className="form-control border-0 bg-light rounded-pill px-3"
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={2}
                  style={{ resize: 'none' }}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <input
                  type="file"
                  className="form-control form-control-sm w-50"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                  onClick={handlePost}
                  className="btn btn-primary rounded-pill px-4"
                >
                  <i className="fas fa-paper-plane me-1"></i> Post
                </button>
              </div>
              {message.text && (
                <div
                  className={`alert alert-${message.type} text-center small py-2 mt-2 mb-0`}
                >
                  {message.text}
                </div>
              )}
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <p className="text-center">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted">
              No posts yet. Be the first to post!
            </p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="card mb-4 shadow-sm border-0">
                <div className="card-body">
                  {/* Author */}
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="bg-primary rounded-circle me-2 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                      style={{ width: 40, height: 40, fontSize: 16 }}
                    >
                      {post.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <Link
                        to={`/profile/${post.user?._id}`}
                        className="text-decoration-none text-dark fw-bold"
                      >
                        {post.user?.name || 'User'}
                      </Link>
                      <div
                        className="text-muted"
                        style={{ fontSize: '0.75rem' }}
                      >
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <p className="card-text">{post.text}</p>

                  {/* Image */}
                  {post.image && (
                    <img
                      src={`http://localhost:5000${post.image}`}
                      className="img-fluid rounded mb-3 w-100"
                      alt="post"
                      style={{ maxHeight: 400, objectFit: 'cover' }}
                    />
                  )}

                  {/* Stats */}
                  {(post.likes?.length > 0 || post.comments?.length > 0) && (
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      {post.likes?.length > 0 && (
                        <span>
                          <i className="fas fa-thumbs-up text-primary me-1"></i>
                          {post.likes.length}
                        </span>
                      )}
                      {post.comments?.length > 0 && (
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleComments(post._id)}
                        >
                          {post.comments.length} comment
                          {post.comments.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex border-top border-bottom py-1 justify-content-around mb-3">
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`btn btn-sm w-50 ${isLiked(post) ? 'text-primary fw-bold' : 'text-muted'}`}
                    >
                      <i
                        className={`${isLiked(post) ? 'fas' : 'far'} fa-thumbs-up me-1`}
                      ></i>
                      Like
                    </button>
                    <button
                      onClick={() => toggleComments(post._id)}
                      className="btn btn-sm text-muted w-50"
                    >
                      <i className="far fa-comment me-1"></i>
                      Comment
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments[post._id] && (
                    <div>
                      {/* Comments List */}
                      {post.comments?.map((comment) => (
                        <div
                          key={comment._id}
                          className="d-flex align-items-start mb-2"
                        >
                          <div
                            className="bg-secondary rounded-circle me-2 d-flex align-items-center justify-content-center text-white flex-shrink-0"
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
                        <div
                          className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: 32, height: 32, fontSize: 14 }}
                        >
                          {currentUser?.user?.name?.charAt(0).toUpperCase() ||
                            'U'}
                        </div>
                        <div className="d-flex gap-2 w-100">
                          <input
                            type="text"
                            className="form-control form-control-sm rounded-pill"
                            placeholder="Write a comment..."
                            value={commentText[post._id] || ''}
                            onChange={(e) =>
                              setCommentText((prev) => ({
                                ...prev,
                                [post._id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) =>
                              e.key === 'Enter' && handleComment(post._id)
                            }
                          />
                          <button
                            className="btn btn-primary btn-sm rounded-pill px-3"
                            onClick={() => handleComment(post._id)}
                          >
                            <i className="fas fa-paper-plane"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Suggestions ── */}
        <div className="col-md-3 d-none d-md-block">
          <div className="card p-3 border-0 shadow-sm">
            <h6 className="mb-3">Suggested for you</h6>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white"
                  style={{ width: 35, height: 35 }}
                >
                  U
                </div>
                <span className="small">User</span>
              </div>
              <button className="btn btn-outline-primary btn-sm rounded-pill">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
