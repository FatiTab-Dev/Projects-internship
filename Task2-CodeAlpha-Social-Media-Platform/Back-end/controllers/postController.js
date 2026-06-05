import Post from '../models/Post.js';
import Notification from '../models/Notification.js'; 

// create post
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let imagePath = '';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    const newPost = await Post.create({
      user: req.user._id,
      text,
      image: imagePath
    });
    const populatedPost = await Post.findById(newPost._id)
      .populate('user', 'name profilePicture');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

// get posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// get posts by user
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user posts' });
  }
};

// delete post
export const deletePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await post.deleteOne();
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// update post
export const updatePost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to edit this post' });
    }
    post.text = text || post.text;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

// toggle like
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
   
      await Notification.findOneAndDelete({
        recipient: post.user,
        sender: req.user._id,
        type: 'like',
        post: post._id
      });
    } else {
      post.likes.push(req.user._id);
     
      if (post.user.toString() !== req.user._id.toString()) {
        await Notification.create({
          recipient: post.user,
          sender: req.user._id,
          type: 'like',
          post: post._id
        });
      }
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like' });
  }
};

// add comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user: req.user._id, text });
    await post.save();

   
    if (post.user.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: post.user,
        sender: req.user._id,
        type: 'comment',
        post: post._id
      });
    }

    const populatedPost = await Post.findById(post._id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments = post.comments.filter(
      comment => comment._id.toString() !== req.params.commentId
    );
    await post.save();
    res.status(200).json({ message: 'Comment removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

// update comment
export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = post.comments.find(c => c._id.toString() === req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    comment.text = text;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
};