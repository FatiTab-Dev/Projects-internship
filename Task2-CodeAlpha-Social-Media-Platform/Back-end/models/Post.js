import mongoose from 'mongoose';
import User from './User.js';

const PostShema = new mongoose.Schema({
   user: { 
     type:mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
    },
   text: {type:String,
    required:true
   },
   createdAt: {
    type: Date,
    default: Date.now
   },
   image: {
   type: String,
   default:''
   },
   likes: [{
      type: mongoose.Schema.Types.ObjectId, 
  ref: 'User'
   }],
   comments : [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
   }]
}, { timestamps: true }); 

const Post = mongoose.model('Post', PostShema);
export default Post;