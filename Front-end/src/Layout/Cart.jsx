import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

export const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + priceNum;
    }, 0);
  };
  const handleCheckout = () => {
  const currentUser = localStorage.getItem('user');
  if (currentUser) {
    navigate('/checkout');
  } else {
    alert('Please login first to proceed to checkout! 🔑');
    navigate('/login');
  }
};

  return (
    <div className="container" style={{ marginTop: '120px', minHeight: '70vh' }}>
      <h2 className="display-5 fw-bold mb-4 text-dark">Your <span style={{ color: '#ff4000' }}>Cart</span></h2>
      
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
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img src={item.img} alt={item.title} className="rounded-3" style={{ width: '70px', height: '60px', objectFit: 'cover' }} />
                      </td>
                      <td className="fw-bold text-dark">{item.title}</td>
                      <td className="text-dark fw-bold">{item.price}</td>
                    </tr>
                  ))}
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
                <span className="fw-bold text-success">${calculateTotal().toLocaleString()}</span>
              </div>
              <button className="btn w-100 rounded-pill fw-bold text-uppercase py-2" style={{ backgroundColor: '#ff4000', color: '#fff' }} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};