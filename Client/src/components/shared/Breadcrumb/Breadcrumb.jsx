import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export const Breadcrumb = ({ breadcrumb, title, description }) => {
  const location = useLocation(); // Hook to get the current location

  console.log(breadcrumb, title, description, 'data check a rah a he ya nhi a rha he ya nhi');

  return (
    <>
      {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
      <div className='detail-block detail-block_margin'>
        <div className='wrapper'>
          <div className='detail-block__content'>
            <h1>{title}</h1>

            {breadcrumb && (
              <ul className='bread-crumbs'>
                {breadcrumb.map(({ path, label }, i) => (
                  <React.Fragment key={i}>
                    {path === location.pathname ? (
                      <li className='bread-crumbs__item'>{label}</li>
                    ) : (
                      <li className='bread-crumbs__item'>
                        <Link to={path} className='bread-crumbs__link'>
                          {label}
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            )}

            {/* IF NEED DESCRIPTION */}
            {description && <span className='error-descr'>{description}</span>}
          </div>
        </div>
      </div>
      {/* <!-- DETAIL MAIN BLOCK EOF   --> */}
    </>
  );
};
