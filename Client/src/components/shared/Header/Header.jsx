import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import useWindowSize from '../../../components/utils/windowSize/windowSize';
import { header, navItem } from '../../../data/data.header';
import { Link, useNavigate } from 'react-router-dom';

import { Nav } from './Nav/Nav';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../pages/_app'; // Adjust the import path

const Header = () => {
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  const navigate = useNavigate();

  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [height, width] = useWindowSize();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Convert token to boolean
  }, []);

  // Sticky Nav Effect
  useEffect(() => {
    const handleScroll = () => setFixedNav(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    if (openMenu && height < 767) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [openMenu, height]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setIsAuthenticated(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      {promo && (
        <div className="header-top">
          <span>30% OFF ON ALL PRODUCTS ENTER CODE: beshop2020</span>
          <i
            onClick={() => setPromo(false)}
            className="header-top-close js-header-top-close icon-close"
          ></i>
        </div>
      )}
      <div className={`header-content ${fixedNav ? 'fixed' : ''}`}>
        <div className="header-logo">
          <Link to="/">
            <img src={header.logo} alt="Logo" />
          </Link>
        </div>
        <div style={{ right: openMenu ? 0 : -360 }} className="header-box">
          {/* Navigation */}
          <Nav navItem={navItem} />
          {/* Header Options */}
          <ul className="header-options">
            <li>
              <Link to="/faq">
                <i className="icon-search"></i>
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                <i className="icon-heart"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="icon-cart"></i>
                <span>{cart?.length ?? '0'}</span>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <i className="icon-user"></i>
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn-link">
                  Logout
                </button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className={`btn-menu js-btn-menu ${openMenu ? 'active' : ''}`}
        >
          {[1, 2, 3].map((i) => (
            <span key={i}>&nbsp;</span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
