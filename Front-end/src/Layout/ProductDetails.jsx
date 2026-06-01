import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import bikesData from './bikesData';
import partbikes1 from '../assets/img/partbikes1.png';
import partbikes2 from '../assets/img/partbikes2.png';
import partbikes3 from '../assets/img/partbikes3.png';
import partbikes4 from '../assets/img/partbikes4.png';
import partbikes5 from '../assets/img/partbikes5.png';
import partbikes6 from '../assets/img/partbikes6.png';
import partbikes7 from '../assets/img/partbikes7.png';
import partbikes8 from '../assets/img/partbikes8.png';
import partbikes9 from '../assets/img/partbikes9.png';
import partbikes10 from '../assets/img/partbikes10.png';
import partbikes11 from '../assets/img/partbikes11.png';

export const ProductDetails = ({ onAddToCart }) => {
    const { id } = useParams();
    const bike = bikesData.find((b) => b.id === parseInt(id));
    const navigate = useNavigate();
    const partImages = [
      partbikes1, partbikes2, partbikes3, partbikes4, 
      partbikes5, partbikes6, partbikes7, partbikes8, 
      partbikes9, partbikes10, partbikes11
    ];
    const [activeImg, setActiveImg] = useState(bike?.img || '');

    if (!bike) {
        return <div className="container text-center mt-5"><h2>Product not found</h2></div>;
    }
    return (
        <div className="container text-center mt-5">
            <div className="row align-items-center mt-4">
             <div className="col-md-7 col-sm-12  d-flex justify-content-center gap-2 flex-wrap mt-3">
              <img src={activeImg} alt={bike.title}  className="img-fluid rounded-4 shadow mb-3" 
             style={{ height: '450px', width: '100%', objectFit: 'cover' }} />
              
              <div className="d-inline justify-content-center gap-2">
                 <img src={bike.img} alt={bike.title} className={`rounded border ${activeImg === bike.img ? 'border-danger border-2' : ''}`} onClick={() => setActiveImg(bike.img)} 
                 style={{ width: '100px', height: '70px', objectFit: 'cover', cursor: 'pointer' }} 
                   />
                  {partImages.map((img, index) => (
                  <img  key={index} src={img} alt={`part ${index + 1}`} className={`rounded border ${activeImg === img ? 'border-danger border-2' : ''}`}  onClick={() => setActiveImg(img)} style={{ width: '100px', height: '70px', objectFit: 'cover', cursor: 'pointer' }} 
                 />
                 ))}
              </div>
             </div>
             <div className="col-md-5 col-sm-12 ">
              <h2 className='text-dark fw-bold my-4'>{bike.title}</h2>
              <p>{bike.desc}</p>
              <p className="fs-4 fw-bold my-5">${bike.price}</p>
              <p className={`fw-bold ${bike.stock > 0 ? 'text-success' : 'text-danger'}`}>
                 {bike.stock > 0 ? `In Stock: ${bike.stock} available` : 'Out of Stock'}
              </p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn mt-4 rounded-pill fw-bold text-uppercase" onClick={() => onAddToCart(bike)} disabled={bike.stock === 0}
                     style={{ backgroundColor: '#ff4000', color: '#fff' }}>
                      {bike.stock > 0 ? 'Add to Cart' : 'Out of Stock'} 
                    </button>
                   <button className="btn mt-4 rounded-pill fw-bold text-uppercase" onClick={() => navigate(-1)} style={{ backgroundColor: '#ff4000', color: '#fff' }}>
                      Back
                   </button>
             </div>
             </div>
             
            </div>
             
        </div>
    );
}