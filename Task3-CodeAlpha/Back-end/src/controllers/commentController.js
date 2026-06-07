import Comment from '../models/Comment.js';

// creat Comment
export const createComment = async (req, res) => {
  try {
    const { text, taskId } = req.body;
    const newComment = await Comment.create({
      text,
      taskId,
      userId: req.user._id,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// get comment
export const getComment = async (req, res) => {
  try {
    const populatedComment = await Comment.find({ taskId: req.params.taskId });
    res.status(200).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// update comment
export const updateComment = async (req, res) => {
  try {
    const { text, taskId } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    comment.text = text || comment.text;
    const updateComment = await comment.save();
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'comment not found' });
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await comment.deleteOne();
    res.status(200).json({ message: 'comment removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};
