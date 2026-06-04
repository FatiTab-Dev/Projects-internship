import Post from '../models/Post.js';

//create post function
export const createPost = async (req, res) => {
    try {
        const {text} = req.body;
        let imagePath = '';
        if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
        const newPost = await Post.create({
            user : req.user._id,
            text,
            image: imagePath
        });
        res.status(201).json({newPost});
    }catch(error){
      res.status(500).json({message:'Error creating post' });
    }
    
};

// get post
export const getPosts = async (req, res) =>{
    try {
        const posts = await Post.find().populate('user', 'name');
       res.status(200).json(posts); 
    }catch(error){
        res.status(500).json({message:'Error feching posts'});
    }
};

//delete post
export const deletePosts = async (req, res) =>{
    try{
     const post = await Post.findById(req.params.id)
     if (!post) return res.status(404).json({ message: 'Post not found' });
     if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }await post.deleteOne();
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// update post
export const updatePost = async(req, res)=>{
  try{
    const {text} = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
     if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to edit this post' });
     }
     post.text = text || post.text;
     const updatePost = await post.save();
     res.status(200).json(updatePost);
    } catch(error){
    res.status(500).json({ message: 'Error updating post' });
  }   
}

// toggle like 
export const toggleLike = async (req, res) =>{
    const post = await Post.findById(req.params.id);
    const isLiked = post.likes.includes(req.user._id);
    if (isLiked) {
        post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
        post.likes.push(req.user._id);
    }
    await post.save();
    res.status(200).json(post);
};

// add comment
export const addComment = async (req, res) => {
 try{
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({message:'Post not found'});

  const newComment = {
    user: req.user._id,
    text
 };
 post.comments.push(newComment);
 await post.save();
 res.status(201).json(post)
 } catch (error){
 res.status(500).json({ message: 'Error adding comment' });
 }
};

//delete comment
export const deleteComment = async (req, res) =>{
    try{
     const post = await Post.findById(req.params.id)
     if (!post) return res.status(404).json({ message: 'Post not found' });
     post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );
     await post.save();
     res.status(200).json({ message: 'comment removed' });
    } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

// update comment
export const updateComment = async(req, res)=>{
  try{
    const {text} = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = post.comments.find(c => c._id.toString() === req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    } 
    comment.text = text;
     const updateComment = await post.save();
     res.status(200).json(updateComment);
    } catch(error){
    res.status(500).json({ message: 'Error updating post' });
  }   
}
