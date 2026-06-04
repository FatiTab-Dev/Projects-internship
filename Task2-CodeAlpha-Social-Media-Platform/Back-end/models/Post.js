import mongoose from 'mongoose';
import User from './User.js';

const PostShema = new mongoose.Schema({
   User: { 
     type:mongoose.Schema.ObjectId,
     ref: 'User',
     required: true
    },
   text: {type:String,
    required:true
   },
   createdAt: {
    type: Date,
    default: Date.now
   }
});

const Post = mongoose.model('Post', PostShema);
export default Post;