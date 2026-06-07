import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 'desc' });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ messge: "Can't fetch products", error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Can't fetch product",
      error: error.message,
    });
  }
});

//create product
router.post('/', async (req, res) => {
  const { title, price, desc, img, stock } = req.body;
  if (!title || !price) {
    return res.status(400).json({ message: 'Please provide title and price' });
  }
  try {
    const newProduct = new Product({
      title,
      price,
      desc,
      img,
      stock,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Can't add product", error: error.message });
  }
});

//update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error: Can't update product",
        error: error.message,
      });
  }
});

//delete product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json({ message: 'Product Deleted Successfully!🗑️' });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error: Can't delete product",
        error: error.message,
      });
  }
});

export default router;
