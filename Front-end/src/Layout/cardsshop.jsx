// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bike01 from '../assets/img/bike01.jpeg';
import bike02 from '../assets/img/bike02.jpeg';
import bike03 from '../assets/img/bike03.jpeg';
import bike04 from '../assets/img/bike04.jpeg';
import bike05 from '../assets/img/bike05.jpeg';
import bike06 from '../assets/img/bike06.jpeg';
import bike07 from '../assets/img/bike07.jpeg';
import bike08 from '../assets/img/bike08.jpg';
import bike09 from '../assets/img/bike09.jpg';

export const Cardsshop = ({ onAddToCart }) => {
  const bikesData = [
    {
      id: 1,
      title: "Red Canyon Pro",
      desc: "Sporty mountain bike featuring precision shifting, excellent suspension, and a striking red finish.",
      price: "$1,349",
      img: bike01
    },
    {
      id: 2,
      title: "Adventure XTR",
      desc: "Built for exploration with a strong frame, reliable components, and superior off-road capability.",
      price: "$1,189",
      img: bike02
    },
    {id: 3,
      title: "Shadow Peak 29",
      desc: "Sleek black MTB equipped with large 29-inch wheels for speed, traction, and smooth trail control.",
      price: "$1,249",
      img: bike03
    },
    {
      id: 4,
      title: "Forest Rider Elite",
      desc: "Versatile trail bike offering comfort, stability, and confidence on mixed mountain routes.",
      price: "$1,099",
      img: bike04
    },{
      id: 5,
      title: "Alpine Blaze",
      desc: "High-performance mountain bike with aggressive geometry, perfect for challenging terrain and fast descents.",
      price: "$1,399",
      img: bike05
    },{
      id: 6,
      title: "Trail Hunter Pro",
      desc: "Durable hardtail MTB featuring responsive handling, powerful brakes, and excellent climbing performance.",
      price: "$1,149",
      img: bike06
    },{
      id: 7,
      title: "Summit Thunder X",
      desc: "Lightweight mountain bike with premium suspension, designed for rough trails and long-distance adventures.",
      price: "$1,299",
      img: bike07
    },{
     id: 8,
      title: "Phoenix Carbon Race",
      desc: "Ultra-lightweight carbon frame engineered for maximum speed and competitive trail racing.",
      price: "$2,100",
      img: bike08
    },{
      id: 9,
      title: "Vanguard Enduro",
      desc: "Advanced full-suspension bike built to dominate aggressive downhill tracks and rocky terrains.",
      price: "$1,750",
      img: bike09
    }

  ];

      
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
                  <span className="fw-bold price d-block fs-4 mb-2">
                    {bike.price}
                  </span>
                  
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn px-4 rounded-pill fw-bold text-uppercase" onClick={() => onAddToCart(bike)}>
                      Add to Cart
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