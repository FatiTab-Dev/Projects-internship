import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const TaskDetail =() => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const [comment, setcomment] = useState([]);
    const [newcomment, cetNewComment] = useState('');
    const [ setEditingComment] = useState(null);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate= useNavigate();
    const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  useEffect(() => {
    fetch(`${API}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setcomment(data))
    .catch(() => setMessage({ text: 'Error fetching tasks', type: 'danger' }));
}, [id]);

const createComment = async () => {
    try {
        const res = await fetch(`${API}/comments`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ 
                text: newcomment, 
                taskId: id
                
            })
        });
        const data = await res.json();
        setcomment(prev => [data, ...prev]);
        cetNewComment('');
    } catch {
        setMessage({ text: 'Error', type: 'danger' });
    }
};
const deleteComment = async (commentId) => {
    try {
        await fetch(`${API}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        setcomment(prev => prev.filter(c => c._id !== commentId));
    } catch {
        setMessage({ text: 'Error deleting comment', type: 'danger' });
    }
};

return (
    <div className='container mt-4'>
        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}
        <button className='btn btn-outline-secondary mb-3' onClick={() => navigate(-1)}>
          ← Back
        </button>
        {/* Comments */}
        <div className='card p-3 mt-3' style={{ width: '100%', maxWidth: '550px'}}>
            <h5>Comments</h5>
            {comment.map(c => (
                <div key={c._id} className='card p-2 mb-2'>
                    <p>{c.text}</p>
                    <small className='text-muted'>{new Date(c.createdAt).toLocaleDateString()}</small>
                    <div className='d-flex gap-2 mt-2'>
            <button className='btn btn-sm btn-outline-danger' onClick={() => deleteComment(c._id)}>Delete</button>
            <button className='btn btn-sm btn-outline-warning' onClick={() => setEditingComment(c)}>Edit</button>
         </div>
                </div>
                
            ))}

            {/* Add Comment */}
            <div className='mt-3'>
                <textarea 
                    className='form-control mb-2' 
                    placeholder='Add a comment...' 
                    value={newcomment} 
                    onChange={(e) => cetNewComment(e.target.value)} 
                />
                <button className='btn btn-outline-info' onClick={createComment}>Add Comment</button>
            </div>
          
        </div>
    </div>
);
};

export default  TaskDetail ;
