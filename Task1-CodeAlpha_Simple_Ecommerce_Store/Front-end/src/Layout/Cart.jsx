import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      return total + priceNum;
    }, 0);
  };

  const handleCheckout = () => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      navigate('/checkout');
    } else {
      setMessage({ text: 'Please login first to proceed to checkout! 🔑', type: 'warning' });
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="container" style={{ marginTop: '120px', minHeight: '70vh' }}>
      <h2 className="display-5 fw-bold mb-4 text-dark">
        Your <span style={{ color: '#ff4000' }}>Cart</span>
      </h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <p className="fs-4 text-muted">Your cart is empty! 🚴‍♂️</p>
          <HashLink to="/#bikes" className="btn btn-warning rounded-pill px-4 fw-bold text-uppercase mt-2">
            Go Shopping
          </HashLink>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="table-responsive bg-white p-3 rounded-4 shadow-sm">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    const itemId = item._id || item.id || index;
                    return (
                      <tr key={itemId}>
                        <td>
                          <img 
                            src={item.img || 'https://via.placeholder.com/150'} 
                            alt={item.title} 
                            className="rounded-3" 
                            style={{ width: '70px', height: '60px', objectFit: 'cover' }} 
                          />
                        </td>
                        <td className="fw-bold text-dark">{item.title || 'No Title'}</td>
                        <td className="text-dark fw-bold">
                          MAD{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <h4 className="fw-bold mb-3 text-dark">Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between fs-5 mb-3">
                <span>Total Items:</span>
                <span className="fw-bold">{cartItems.length}</span>
              </div>
              <div className="d-flex justify-content-between fs-4 mb-4">
                <span>Total Price:</span>
                <span className="fw-bold text-success">
                 {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MAD
                </span>
              </div>
              <button 
                className="btn w-100 rounded-pill fw-bold text-uppercase py-2" 
                style={{ backgroundColor: '#ff4000', color: '#fff' }} 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              {message.text && (
                <p className={`small mt-3 text-center fw-bold ${message.type === 'warning' ? 'text-danger' : 'text-success'}`}>
                  {message.text}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;