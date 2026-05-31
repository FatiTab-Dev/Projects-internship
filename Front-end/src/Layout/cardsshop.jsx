// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bike01 from '../assets/img/bike01.jpeg';
import bike02 from '../assets/img/bike02.jpeg';
import bike03 from '../assets/img/bike03.jpeg';
import bike04 from '../assets/img/bike04.jpeg';
import bike05 from '../assets/img/bike05.jpeg';
import bike06 from '../assets/img/bike06.jpeg';
import bike07 from '../assets/img/bike07.jpeg';

export const Cardsshop = () => {
  return (
     <div className="container text-center">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card">
            <img src={bike01} alt="Red Canyon Pro" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Red Canyon Pro</h5>
              <p className="card-text">
                Sporty mountain bike featuring precision shifting, excellent suspension, and a striking red finish.
                <span className="fw-bold price d-block"> $1,349</span>
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
              src={bike02}
              alt="Aurora"
              className="card-img-top"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">Adventure XTR</h5>
              <p className="card-text">
                Built for exploration with a strong frame, reliable components, and superior off-road capability.<span className="fw-bold price d-block">
                  $1,189</span
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
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card">
            <img
              src={bike03}
              alt="Shadow Peak 29"
              className="card-img-top"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">Shadow Peak 29</h5>
              <p className="card-text">
                Sleek black MTB equipped with large 29-inch wheels for speed, traction, and smooth trail control.
                <span className="fw-bold price d-block">
                  $1,249
                </span>
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
              src={bike04}
              alt="Forest Rider Elite"
              className="card-img-top"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">Forest Rider Elite</h5>
              <p className="card-text">
                Versatile trail bike offering comfort, stability, and confidence on mixed mountain routes.<span className="fw-bold price d-block">
                  $1,099
                </span>
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
              src={bike05}
              alt="Alpine Blaze"
              className="card-img-top"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">Alpine Blaze</h5>
              <p className="card-text">
                High-performance mountain bike with aggressive geometry, perfect for challenging terrain and fast descents.<span className="fw-bold price d-block">
                  $1,399
                </span>
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
              src={bike06}
              alt="Trail Hunter Pro"
              className="card-img-top"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">Trail Hunter Pro</h5>
              <p className="card-text">
                Durable hardtail MTB featuring responsive handling, powerful brakes, and excellent climbing performance.
                <span className="fw-bold price d-block">
                  $1,149
                </span>
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
              src={bike07}
              alt="Summit Thunder X"
              className="card-img-top"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">Summit Thunder X</h5>
              <p className="card-text">
                Lightweight mountain bike with premium suspension, designed for rough trails and long-distance adventures.
                <span className="fw-bold price d-block">
                  $1,299
                </span>
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