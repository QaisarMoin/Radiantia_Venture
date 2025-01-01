import { Link } from "react-router-dom"
// import { Nav } from "../shared/Header/Nav/Nav"
import { AdminnavItem } from "../../data/data.header"
import useWindowSize from '../../components/utils/windowSize/windowSize';
import { useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react';

export const SideBar =()=>{
  const router = useLocation();
  const [sub, setSub] = useState(false);
  const [height, width] = useWindowSize();

  const AdminItem = AdminnavItem;

  useEffect(() => {
    if (height > 768) {
      setSub(false);
    }
  }, [height]);
  return (
    <ul className='adminNavBar header-nav '>
      {AdminItem.map((nav) => (
        <li
          key={nav.path}
          onClick={() => {
            nav.subNav ? setSub(!sub) : '';
          }}
        >
          <Link to={nav.path}>
            <a className={nav.path === router.pathname ? 'active' : ''}>
              {nav.name}
            </a>
          </Link>
          {nav.subNav && (
            <ul className={sub ? 'active' : ''}>
              {nav.subNav.map((sub) => (
                <li key={sub.path}>
                  <Link to={sub.path}>
                    {sub.name} 
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

