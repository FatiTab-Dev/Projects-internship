import express from 'express';
import connectDB from './controllers/db.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';

connectDB();
const app = express();
app.use(express.json());
app.use('/api/users',userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));