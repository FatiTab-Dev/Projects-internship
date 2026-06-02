import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
const PORT = process.env.PORT || 5000;


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/orders',orderRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT);