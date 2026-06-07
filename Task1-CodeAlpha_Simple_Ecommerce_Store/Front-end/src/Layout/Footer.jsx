import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5 border-top border-secondary">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start g-4">
          {/* about site*/}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5
              className="text-uppercase mb-4 fw-bold "
              style={{ letterSpacing: '1px', color: '#ff4000' }}
            >
              VERTE X
            </h5>
            <p className="small" style={{ lineHeight: '1.8' }}>
              Your ultimate destination for premium bicycles and professional
              riding gear. We provide top-quality bikes designed for
              performance, comfort, and adventure.
            </p>
          </div>

          {/* (Navigation) */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-white small">
              Quick Links
            </h6>
            <p className="mb-2">
              <Link
                to="/"
                className=" text-white text-decoration-none small hover-link"
              >
                Home
              </Link>
            </p>
            <p className="mb-2">
              <Link
                to="/cart"
                className=" text-white text-decoration-none small hover-link"
              >
                Shopping Cart
              </Link>
            </p>
            <p className="mb-2">
              <Link
                to="/checkout"
                className="text-white text-decoration-none small hover-link"
              >
                Checkout
              </Link>
            </p>
          </div>

          {/*    support */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-white small">
              Customer Care
            </h6>
            <p className="mb-2">
              <a
                href="#"
                className="text-white text-decoration-none small hover-link"
              >
                Support Center
              </a>
            </p>
            <p className="mb-2">
              <a
                href="#"
                className="text-white text-decoration-none small hover-link"
              >
                Shipping & Returns
              </a>
            </p>
            <p className="mb-2">
              <a
                href="#"
                className="text-white text-decoration-none small hover-link"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/*   contact information */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-white small">
              Contact
            </h6>
            <p className="small mb-2">
              <i className="fas fa-home me-2"></i> Morocco
            </p>
            <p className="small mb-2">
              <i className="fas fa-envelope me-2 "></i> support@verteX.com
            </p>
            <p className="small mb-2">
              <i className="fas fa-phone me-2"></i> +212 600-000000
            </p>
          </div>
        </div>

        <hr className="mb-4 mt-4 text-secondary" />

        {/* social media */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <p className="small mb-0">
              © {new Date().getFullYear()}{' '}
              <strong className="text-white">VERTE X</strong>. All Rights
              Reserved. Designed with ❤️
            </p>
          </div>

          <div className="col-md-5 col-lg-4 text-center text-md-end mt-3 mt-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item mx-2">
                <a
                  href="https://www.facebook.com"
                  className=" hover-social"
                  style={{ fontSize: '18px' }}
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item mx-2">
                <a
                  href="https://www.instagram.com"
                  className=" hover-social"
                  style={{ fontSize: '18px' }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item mx-2">
                <a
                  href="https://www.twitter.com"
                  className="hover-social"
                  style={{ fontSize: '18px' }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item mx-2">
                <a
                  href="https://www.linkedin.com"
                  className="hover-social"
                  style={{ fontSize: '18px' }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
