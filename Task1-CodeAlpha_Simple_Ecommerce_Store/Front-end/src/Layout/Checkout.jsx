import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Checkout = ({ cartItems, user, onCheckout }) => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item || !item.price) return total;
      const priceNum = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      return total + priceNum;
    }, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setMessage({ text: "Your cart is empty! 🛒", type: 'danger' });
      return;
    }

    const fullAddress = `${address}, ${city}`;

    const orderData = {
      customerName: user ? user.name : 'Guest Customer',
      customerEmail: user ? user.email : 'guest@example.com',
      phone: phone,
      address: fullAddress,
      totalAmount: calculateTotal(),
      items: cartItems.map(item => ({
        productId: item._id || item.id,
        title: item.title,
        price: typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0,
        quantity: item.quantity || 1
      }))
    };

    try {
      const response = await fetch(`${API}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage({ text: 'Your order has been placed successfully! 🎉', type: 'success' });
        if (onCheckout) onCheckout();
        setTimeout(() => {
          navigate('/');
        }, 2500);
      } else {
        const errorData = await response.json();
        setMessage({ text: errorData.message || 'Failed to place order. ❌', type: 'danger' });
      }
    } catch (error) {
      setMessage({ text: 'Server connection error. Please try again later.', type: 'danger' });
    }
  };

  return (
    <div className="container my-5 pt-5">
      <h2 className="fw-bold mb-4 text-center">Checkout Process</h2>
      <div className="row g-4">
        
        {message.text && (
          <div className="col-12">
            <h3 className={`alert alert-${message.type} text-center`} role="alert">
              {message.text}
            </h3>
          </div>
        )}

        <div className="col-lg-6 col-md-12">
          <div className="bg-white p-4 rounded-4 shadow-sm border">
            <h4 className="fw-bold mb-4 text-dark">
              <i className="fas fa-shipping-fast me-2 text-warning"></i>Shipping Details
            </h4>
            <form onSubmit={handlePlaceOrder}>
              
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Full Name</label>
                <input type="text" className="form-control py-2 bg-light" value={user ? user.name : 'Guest'} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Email Address</label>
                <input type="email" className="form-control py-2 bg-light" value={user ? user.email : 'guest@example.com'} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control py-2" 
                  placeholder="e.g. 060000000" 
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
                    placeholder="e.g.Casablanca" 
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
            <h4 className="fw-bold mb-3 text-dark">
              <i className="fas fa-shopping-basket me-2 text-warning"></i>Order Summary
            </h4>
            <hr />
            
            <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {cartItems.map((item, index) => (
                <div key={item._id || item.id || index} className="d-flex justify-content-between align-items-center mb-2 small">
                  <span className="text-muted">{item.title}</span>
                  <span className="fw-bold text-dark">
                    {typeof item.price === 'number' ? item.price.toFixed(2) : item.price} MAD
                  </span>
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
              <span className="fw-bold text-success">
                {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MAD
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;