import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import connectDB from './src/conf/db.js';
const app = express();
connectDB();
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
