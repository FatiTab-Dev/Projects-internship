import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Checkout = ({ cartItems, user, onCheckout }) => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    
    const calculateTotal = () => {
     return cartItems.reduce((total, item) => {
        if (!item || !item.price) return total;

     let priceNum;
     if (typeof item.price === 'number') {
      priceNum = item.price;
     } else {
      const cleanPrice = item.price.toString().replace(/[^0-9.]/g, "");
      priceNum = parseFloat(cleanPrice);
     }
     return total + (isNaN(priceNum) ? 0 : priceNum);
     }, 0);
    };
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setMessage({ text: "Your cart is empty! 🛒", type: 'danger' });
      return;
    }

    const newOrder = {
      id: 'ORD-' + Math.floor(Math.random() * 100000), 
      customerName: user ? user.name : 'Guest Customer',
      customerEmail: user ? user.email : 'Guest Email',
      address: address,
      city: city,
      phone: phone,
      items: cartItems,
      totalAmount: calculateTotal(),
      date: new Date().toLocaleDateString('en-US'),
      status: 'Pending'
    };
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    if (onCheckout) onCheckout(cartItems[0].id, cartItems.length);
    setMessage({ text: 'Your order has been placed successfully! 🎉', type: 'success' });
    navigate('/checkout');
  };
  return (
    <div className="container my-5 pt-5">
      <h2 className="fw-bold mb-4 text-center">Checkout Process</h2>
      <div className="row g-4">
        
       {message.text && (
          <h3 className={`alert alert-${message.type} text-center`} role="alert">
            {message.text}
          </h3>
        )}
        <div className="col-lg-6 col-md-12">
          <div className="bg-white p-4 rounded-4 shadow-sm border">
            <h4 className="fw-bold mb-4 text-dark"><i className="fas fa-shipping-fast me-2 text-warning"></i>Shipping Details</h4>
            <form onSubmit={handlePlaceOrder}>
              
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Full Name</label>
                <input type="text" className="form-control py-2 bg-light" value={user ? user.name : 'Guest'} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Email Address</label>
                <input type="email" className="form-control py-2 bg-light" value={user ? user.email : 'Guest@example.com'} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control py-2" 
                  placeholder="e.g. +212 600000000" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold text-muted">City</label>
                  <input 
                    type="text" 
                    className="form-control py-2" 
                    placeholder="e.g. morocco" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold text-muted">Shipping Address</label>
                  <input 
                    type="text" 
                    className="form-control py-2" 
                    placeholder="Street address, Apartment..." 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn w-100 rounded-pill fw-bold text-uppercase py-2.5 text-white shadow-sm mt-3"
                style={{ backgroundColor: '#ff4000', border: 'none' }}
              >
                Place Order Now 💳
              </button>
            </form>
          </div>
        </div>


        <div className="col-lg-6 col-md-12">
          <div className="bg-white p-4 rounded-4 shadow-sm border">
            <h4 className="fw-bold mb-3 text-dark"><i className="fas fa-shopping-basket me-2 text-warning"></i>Order Summary</h4>
            <hr />
            
           
            <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {cartItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2 small">
                  <span className="text-muted">{item.name}</span>
                  <span className="fw-bold text-dark">{item.price}</span>
                </div>
              ))}
            </div>
            <hr />

            <div className="d-flex justify-content-between fs-5 mb-3">
              <span>Total Items:</span>
              <span className="fw-bold">{cartItems.length}</span>
            </div>
            <div className="d-flex justify-content-between fs-4 mb-2">
              <span>Total Price:</span>
              <span className="fw-bold text-success">${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};