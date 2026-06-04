import express from 'express';
import cors from 'cors';
import connectDB from './controllers/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import 'dotenv/config';

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
