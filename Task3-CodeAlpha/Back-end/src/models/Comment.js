import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
 text: {type:String, required: true},
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
 taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required:true }
}, {timestamps:true}
);

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;