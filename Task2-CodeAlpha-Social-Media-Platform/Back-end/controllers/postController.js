import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    try {
        const {text} = req.body;
        const newPost = await Post.create({
            user : req.user._id,
            text
        });
        res.status(201).json({newPost});
    }catch(error){
      res.status(500).json({message:'Error creating post' });
    }
    
};

export const getPosts = async (req, res) =>{
    try {
        const posts = await Post.find().populate('user', 'name');
       res.status(200).json(posts); 
    }catch(error){
        res.status(500).json({message:'Error feching posts'});
    }
};

export const deletePosts = async (req, res) =>{
    try{
     const posts = await Post.findById(req.params.id)
     if (!post) return res.status(404).json({ message: 'Post not found' });
     if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }await post.deleteOne();
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

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