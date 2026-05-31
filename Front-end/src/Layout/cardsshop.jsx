// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Cardsshop = () => {
  return (
     <div className="container text-center">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card">
            <img src="img/gold aurora.jpeg" alt="Aurora" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Midnight Majesty</h5>
              <p className="card-text">
                Imperial Oud Dark Star
                <span className="fw-bold price d-block"> 390MAD</span>
              </p>
              <button className="btn btn-warning">Add to Cart</button>
              <button className="btn btn-delete rounded-3 d-none p-1">
                <img
                  src="trash.svg"
                  alt="trash"
                  style={{ width: '20px', height: '20px' }}         
                />
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card">
            <img
              src="img/dark.jpeg"
              alt="Aurora"
              className="card-img-top"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">Mystic Noir</h5>
              <p className="card-text">
                Smoky woods deep mystery<span className="fw-bold price d-block">
                  400MAD</span
                >
              </p>
              <button className="btn btn-warning">Add to Cart</button>
              <button className="btn btn-delete rounded-3 d-none p-1">
                <img
                  src="trash.svg"
                  alt="trash"
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </div>
          </div>
        </div>
    </div>
    </div>
 );
};