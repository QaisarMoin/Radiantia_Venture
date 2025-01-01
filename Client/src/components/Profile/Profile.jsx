import { useState } from 'react';
import { ProfileAside } from './ProfileAside/ProfileAside';
import { ProfileOrders } from './ProfileOrders/ProfileOrders';
import MyInfo from './MyInfo';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const userID = localStorage.getItem('userId');
  return (
    <>
      {/* <!-- BEGIN PROFILE --> */}
      <div className='profile'>
        <div className='wrapper'>
          <div className='profile-content'>
            <ProfileAside />
            <div className='profile-main'>
              <div className='tab-wrap'>
                <ul className='nav-tab-list tabs'>
                  <li
                    onClick={() => setActiveTab('myInfo')}
                    className={activeTab === 'myInfo' ? 'active' : ''}
                  >
                    My info
                  </li>
                  <li
                    onClick={() => setActiveTab('orders')}
                    className={activeTab === 'orders' ? 'active' : ''}
                  >
                    My orders
                  </li>
                  <li
                    onClick={() => setActiveTab('wishList')}
                    className={activeTab === 'wishList' ? 'active' : ''}
                  >
                    Wishlist
                  </li>
                </ul>

                <div className='box-tab-cont'>
                  {activeTab === 'myInfo' && (
                    <div className='tab-cont' id='profile-tab_1'>
            
                      <MyInfo userId={userID}/>
                    </div>
                  )}

                  {activeTab === 'orders' && <ProfileOrders />}

                  {activeTab === 'wishList' && (
                    <div className='tab-cont' id='profile-tab_3'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cumque tempore saepe blanditiis omnis. Reprehenderit
                      officia atque facere tempora, neque quaerat et aliquid
                      tempore mollitia, nemo, minima iste placeat cupiditate
                      odio?
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- PROFILE EOF   --> */}
    </>
  );
};
