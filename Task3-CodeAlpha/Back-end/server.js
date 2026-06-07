import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './src/conf/db.js';
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectsRoutes.js';
import taskRoutes from './src/routes/tasksRoutes.js';
import commentRoutes from './src/routes/commentsRoutes.js';
import notificationRoutes from './src/routes/notificationsRoutes.js';
import { initSocket } from './src/socket/index.js';
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173' },
});
initSocket(io);
app.set('io', io);
connectDB();
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
