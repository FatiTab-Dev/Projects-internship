import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import connectDB from './src/conf/db.js';
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectsRoutes.js';
const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use('/api/auth', authRoutes);
app.use('api/projects',projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
