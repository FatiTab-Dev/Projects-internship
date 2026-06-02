import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cardsshop = ({ onAddToCart }) => {
  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBikes(data);
        } else if (data && Array.isArray(data.products)) {
          setBikes(data.products);
        } else {
          setBikes([]);
        }
        setLoading(false);
        
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [API]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="bikes" className="container text-center my-5">
      <h2 className="display-4 fw-bold text-dark mb-5">
        Explore Our <span className="caption">Top Bikes</span>
      </h2>

      <p className="lead text-muted mb-5">
        Discover our premium selection of mountain bikes, designed for riders who demand performance, durability, and style on every trail.
      </p>

      <div className="row g-4">
        {bikes.length > 0 ? (
          
          bikes.map((bike) => (
            <div
              key={bike._id || bike.id}
              className="col-lg-4 col-md-6 col-sm-12"
            >
              <div className="card h-100 shadow-sm border-0 custom-bike-card">

                <img
                  src={bike.img || 'https://via.placeholder.com/300'}
                  alt={bike.title}
                  className="card-img-top p-2 rounded-4"
                  loading="lazy"
                  style={{
                    height: '240px',
                    objectFit: 'cover',
                  }}
                />
                

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-dark">
                      {bike.title}
                    </h5>

                    <p className="card-text text-muted fs-6">
                      {bike.desc}
                    </p>
                  </div>

                  <div className="mt-3">
                    <span className="fw-bold price d-block fs-4 mb-2">
                   ${Number(bike.price).toLocaleString()}
                   </span>

                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn px-4 rounded-pill fw-bold text-uppercase"
                        onClick={() => onAddToCart(bike)}
                      >
                        Add to Cart
                      </button>

                      <button
                        className="btn fw-bold text-uppercase"
                        title="View Details"
                        onClick={() =>
                          navigate(`/product/${bike._id || bike.id}`)
                        }
                      >
                        <i className="bi bi-info-circle fs-5"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <h4 className="text-muted">
              No bikes found in the database.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardsshop;