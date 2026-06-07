import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a bike name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    desc: {
      type: String,
      default: 'No description provided.',
    },
    img: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    stock: {
      type: Number,
      default: 5,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
