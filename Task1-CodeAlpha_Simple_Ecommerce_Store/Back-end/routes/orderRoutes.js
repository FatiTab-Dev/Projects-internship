import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

//creat new order
router.post('/', async (req, res) =>{
    const { customerName, customerEmail, phone, address, items, totalAmount } = req.body;
    if (!customerName || !customerEmail || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({message: 'All fileds and at least one item are required.'});
    }
    try{
        const newOrder = new Order({
        customerName,
      customerEmail,
      phone,
      address,
      items,
      totalAmount
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
    }catch (error){
        res.status(500).json({message: 'Can\'t place order', error: error.message});
    }
});

//get all orders
router.get('/', async (req, res) =>{
    try{
         const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error){
        res.status(500).json({message:'Can\'t fetch orders', error: error.message });

    }
});

export default router;
