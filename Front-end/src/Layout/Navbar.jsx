import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import  logo from '../assets/img/logo.png';


export const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
     setMenuOpen(false);
  }

  return (
    
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-light fixed-top flex-row gap-4 ms-auto ${scrolled ? "scrolled shadow" : ""}`}>
        <div className="container-fluid px-3">
          <a className="navbar-brand fw-bold" href="#home"><img src={logo} alt="Logo" /></a>
          <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <span style={{ fontSize: '1.5rem', color: 'black' }}>
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
          <div className={`navbar-collapse ${menuOpen ? 'd-block' : 'd-none d-lg-flex'}`}>
           <div className="navbar-nav d-flex flex-column flex-lg-row gap-4 gap-lg-4 ms-auto mt-3 mt-lg-0">
            <HashLink 
              className={activeLink === 'home' ? 'nav-link active' : 'nav-link'} 
              to="#cards" 
              onClick={() => onUpdateActiveLink('home')}
            ><i className="fas fa-cart-plus"></i></HashLink> 
            <HashLink 
              className={activeLink === 'login' ? 'nav-link active btn' : 'nav-link btn'} 
              to="#login" 
              onClick={() => onUpdateActiveLink('login')}
            >Login</HashLink>
           
          </div>
          </div>
        </div>
      </nav>
    </div>
  );
}