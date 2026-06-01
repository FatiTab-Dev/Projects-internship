
import { useNavigate } from 'react-router-dom';
import bikesData from './bikesData';

export const Cardsshop = ({ onAddToCart }) => {
  const navigate = useNavigate();

  return (
     <div  id ="bikes" className="container text-center">
       <h2 className="display-4 fw-bold text-dark mb-5">Explore Our <span className="caption">Top Bikes</span></h2>
       <p className="lead text-muted mb-5">Discover our premium selection of mountain bikes, designed for riders who demand performance, durability, and style on every trail.</p>
      <div className="row g-4">
      {bikesData.map((bike) => (
          <div key={bike.id} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100 shadow-sm border-0 custom-bike-card">
              <img 
                src={bike.img} 
                alt={bike.title} 
                className="card-img-top p-2 rounded-4" 
                loading="lazy" 
                style={{ height: '240px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold text-dark">{bike.title}</h5>
                  <p className="card-text text-muted fs-6">{bike.desc}</p>
                </div>
                
                <div className="mt-3">
                  <span className="fw-bold price d-block fs-4 mb-2">${bike.price}</span>
                  
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn px-4 rounded-pill fw-bold text-uppercase" onClick={() => onAddToCart(bike)}>
                      Add to Cart
                    </button>
                    <button className="btn fw-bold text-uppercase" onClick={() => navigate(`/product/${bike.id}`)} title="View Details">
                      <i className="bi bi-info-circle fs-5"></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
    
 );
};
export default Cardsshop;
