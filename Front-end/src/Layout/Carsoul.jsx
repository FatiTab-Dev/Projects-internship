// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bike1 from '../assets/img/bike1.jpg'; 
import bike2 from '../assets/img/bike2.jpg'; 
import bike3 from '../assets/img/bike3.jpg'; 
import bike4 from '../assets/img/bike4.jpg'; 
import bike5 from '../assets/img/bike5.jpg'; 

export const Carsoul = () => {
  return (
    <div id="home" className="hero-carousel-wrapper">
      <div id="bikeCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
        
       
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#bikeCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#bikeCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#bikeCarousel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#bikeCarousel" data-bs-slide-to="3"></button>
          <button type="button" data-bs-target="#bikeCarousel" data-bs-slide-to="4"></button>
        </div>

        
        <div className="carousel-inner">
          
          
          <div className="carousel-item active">
            <div className="overlay"></div>
           
            <img src={bike1} className="d-block w-100 carousel-img" alt="Mountain Bike 1" />
            <div className="carousel-caption text-start px-4">
              <h1 className="display-3 fw-bold text-white uppercase-text">Discover the Power<br/> of<span className="text-warning">Unmatched Durability</span></h1>
              <p className="lead text-white-50 my-4">Professional bikes engineered to conquer the toughest trails and highest peaks.</p>
              <a href="#bikes" className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold text-dark shadow-lg custom-btn">
              Shop Now <i className="fas fa-shopping-bag ms-2"></i>
              </a>
            </div>
          </div>

          
          <div className="carousel-item">
            <div className="overlay"></div>
            <img src={bike2} className="d-block w-100 carousel-img" alt="Mountain Bike 2" />
            <div className="carousel-caption text-start px-4">
              <h1 className="display-3 fw-bold text-white">Speed, Lightness, <br/><span className="text-warning">Unmatched Performance</span></h1>
              <p className="lead text-white-50 my-4">Carbon fiber and advanced engineering give you complete control on every trail.</p>
              <a href="#bikes" className="btn btn-outline-warning btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg custom-btn">
               view details<i className="fas fa-arrow-left ms-2"></i>
              </a>
            </div>
          </div>

           <div className="carousel-item">
            <div className="overlay"></div>
            <img src={bike3} className="d-block w-100 carousel-img" alt="Mountain Bike 4" />
          </div>

          <div className="carousel-item">
            <div className="overlay"></div>
            <img src={bike4} className="d-block w-100 carousel-img" alt="Mountain Bike 5" />
          </div>
           <div className="carousel-item">
            <div className="overlay"></div>
            <img src={bike5} className="d-block w-100 carousel-img" alt="Mountain Bike 5" />
          </div>
        </div>

       


        
        <button className="carousel-control-prev" type="button" data-bs-target="#bikeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bikeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>
    </div>

  );
};