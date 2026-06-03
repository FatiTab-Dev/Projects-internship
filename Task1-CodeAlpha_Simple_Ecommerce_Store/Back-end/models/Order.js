import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'customer name is required'],
    },
    customerEmail: {
        type: String,
        required: [true, 'customer email is required'],
    },  
    phone: {
        type: String,
        required: [true, 'customer phone number is required'],
    },
    address: {
        type: String,
        required: [true, 'customer address is required'],
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    }
}, { 
    timestamps: true 
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;