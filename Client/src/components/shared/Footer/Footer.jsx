import footerNavData from '../../../data/footer/footerNav.json';
import paymentMethodData from '../../../data/footer/payment.json';
import socialData from '../../../data/social';
import {Link} from 'react-router-dom';
import { NavCol } from './NavCol/NavCol';

export const Footer = () => {
  const footerLogo = '/assets/img/Radiantia2.png';

  const footerNav = [...footerNavData];
  const footerSocial = [...socialData];
  const paymentMethods = [...paymentMethodData];

  return (
    <>
      {/* <!-- BEGIN FOOTER --> */}
      <footer className='footer'>
        <div className='wrapper'>
          <div className='footer-top'>
            <div className='footer-top__social'>
              <span>Find us here:</span>
              <ul>
                {footerSocial.map((social, index) => (
                  <li key={index}>
                    <a href={social.path}>
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className='footer-top__logo'>
              <Link href='/'>
                <a>
                  <img src={footerLogo} className='js-img' alt='' />
                </a>
              </Link>
            </div>

            {/* Payment method */}
            <div className='footer-top__payments'>
              <span>Payment methods:</span>
              <ul>
                {paymentMethods.map((payment, index) => (
                  <li key={index}>
                    <img src={payment.icon} className='js-img' alt='' />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='footer-nav'>
            {/* Footer Nav */}
            {footerNav.map((nav, index) => (
              <NavCol nav={nav} key={index} />
            ))}
            <div className='footer-nav__col'>
              <span className='footer-nav__col-title'>Contact</span>
              <ul>
                <li>
                  <i className='icon-map-pin'></i> N.228, Moti Ward Number 01, Katra Mohalla Sihora, Jabalpur Madhya Pradesh 483225
                </li>
                <li>
                  <i className='icon-smartphone'></i>
                  <div className='footer-nav__col-phones'>
                    <a href='tel:+13459971345'>+91 9131356954 </a>
                    
                  </div>
                </li>
                <li>
                  <i className='icon-mail'></i>
                  <a href='mailto:sapnajanwani123456@gmail.com'>sapnajanwani123456@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='footer-copy'>
            <span>&copy; All rights reserved. Doaguru2024</span>
            <Link to={"/RadiantiaAdminPanelDoaguru"}><span>&copy; All rights reserved. Radiantia Venture Pvt. Ltd.</span></Link>
          </div>
        </div>
      </footer>
      {/* <!-- FOOTER EOF   --> */}
    </>
  );
};
