import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import useWindowSize from '../../components/utils/windowSize/windowSize';
import { AdminnavItem, header } from '../../data/data.header';
import { Link, useNavigate } from 'react-router-dom';

import { Nav } from '../shared/Header/Nav/Nav';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../pages/_app'; // Adjust the import path

export const AdminHeader = () => {
  const cartContext = useContext(CartContext);
  

  const navigate = useNavigate();


  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [height, width] = useWindowSize();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
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
    localStorage.removeItem('adminToken'); // Remove token
    setIsAuthenticated(false); // Update state
    navigate('/RadiantiaAdminLoginPageDoaguru'); // Redirect to login page
  };

  return (
    <header className="header">

      <div className={`header-content header-content-Admin ${fixedNav ? 'fixed' : ''}`}>
        <div className="header-logo">
          <Link to="/">
            <img src={header.logo} alt="Logo" />
          </Link>
        </div>
        <div style={{ right: openMenu ? 0 : -360 }} className="header-box">
          {/* Navigation */}
         
          {/* Header Options */}
          <ul className="header-options">
            <li>
              <Link to="/AdminProfile">
                <i className="icon-user"></i>
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn-link">
                  Logout
                </button>
              ) : (
                <Link to="/login"></Link>
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

