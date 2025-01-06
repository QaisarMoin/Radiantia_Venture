// React Component for My Info
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from '../ProfileCard/ProfileCard';
import SocialMediaPromotion from './MyInfo/Promotion';
import DirectIncomeDetails from './MyInfo/directIncome';

const MyInfo = ({ userId }) => {
  console.log(userId);

  const [userInfo, setUserInfo] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [referralLink, setReferralLink] = useState('');
  const [showPromotion, setShowPromotion] = useState(false);
  const [showDirectIncomn, setshowDirectIncom] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data: userData } = await axios.get(`https://rmpl.net.in/api/user/user/${userId}`);
        setUserInfo(userData);

        const { data: referralData } = await axios.get(`https://rmpl.net.in/api/user/user/${userId}/referrals`);
        setReferrals(Array.isArray(referralData) ? referralData : []); // Ensure referrals is always an array
      } catch (err) {
        console.error('Error fetching user info:', err);
        setReferrals([]); // Fallback to empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  // console.log(userInfo, 'check data a raha he ya nhi ');
  // console.log(referrals, 'check data a raha he ya nhi ');

  useEffect(() => {
    // Fetch referral link from the backend
    axios.get(`https://rmpl.net.in/api/user/referral/${userId}`)
      .then(response => setReferralLink(response.data.referralLink))
      .catch(err => console.error(err));
  }, []);

  console.log(referralLink);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const togglePromotion = () => {
    setShowPromotion(!showPromotion);
  }
//  console.log(userInfo.status, "status");
 

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-info">
      <h2>My Info</h2>
      <div>
        <p>ID: {userInfo?.custom_id || 'N/A'}</p>
      </div>
      <div>
        <p>You are connected with us through their reference.: {"RMPL"  + referrals.map((ref) => ref.user_id) || 'N/A'}</p>
      </div>
      <div>
        <ProfileCard
          name={userInfo?.name || 'Hello User'}
          mobile={userInfo?.mobile_no || '+91 00000 00000'}
          email={userInfo?.email || 'email@example.com'}
          imageUrl={userInfo?.profile_img || "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"}
          club={userInfo?.club_name || 'N/A'}
          totalIncome={userInfo?.total_income || 0}
        />
      </div>
      <div className="club-info">
        {/* <p><strong>Club:</strong> {userInfo?.club_name || 'N/A'}</p> */}
      </div>

      <div className="income-info">
        <h3>Income Details</h3><br />
        <ul>
          <li><strong>Company Promotion:</strong> ₹ {userInfo?.company_promotion || 0}</li>
          <li><strong>Direct Income:</strong> ₹ {userInfo?.direct_income || 0}</li>
          <li><strong>Level Income:</strong> ₹ {userInfo?.level_income || 0}</li>
          <li><strong>Smart CTO:</strong> ₹ {userInfo?.smart_cto || 0}</li>
          <li><strong>Franchise Income:</strong> ₹ {userInfo?.franchise_income || 0}</li>
          <li><strong>Rank and Reward:</strong> ₹ {userInfo?.rank_and_reward || 0}</li>
          <li><strong>Re-top Up Income:</strong> ₹ {userInfo?.re_top_up_income || 0}</li>
        </ul>
      </div>

      <div className='SevenlevelDetails'>
        <div >
          <h5> <strong>Company Promotion:</strong></h5><hr />
          <span className='updatePromotion' style={{ cursor: 'pointer', color: showPromotion ? 'red' : 'blue' }} onClick={togglePromotion}>{showPromotion ? ' X ' : 'Update Promotion'}</span>
          {showPromotion && <SocialMediaPromotion userId={userId} />}
          <hr />
        </div>
        <div>
          <h5> <strong>Direct Income:</strong></h5><hr />
          <span
            className='updatePromotion'
            style={{ cursor: 'pointer', color: showDirectIncomn ? 'red' : 'blue' }}
            onClick={() => setshowDirectIncom(!showDirectIncomn)}>
            {showDirectIncomn ? ' X ' : 'Check Direct Income'}
          </span>
          {showDirectIncomn && <DirectIncomeDetails referrals={referrals} />}
          <hr />
        </div>
        <div>
          <h5> <strong>Level Income:</strong></h5><hr />

          <hr />
        </div>
        <div>
          <h5> <strong>Smart CTO:</strong></h5> <hr />

          <hr />
        </div>
        <div>
          <h5> <strong>Franchise Income:</strong></h5> <hr />

          <hr />
        </div>
        <div>
          <h5> <strong>Rank and Reward:</strong></h5><hr />

          <hr />
        </div>
        <div>
          <h5> <strong>Re-top Up Income:</strong></h5> <hr />

          <hr />
        </div>
      </div>
      <br />
      {/* <div className="referral-info">
        <h3>Referrals</h3>
        <div>
          <h3>Refer and Earn</h3>
          <input type="text" value={referralLink} readOnly />
          <button onClick={copyToClipboard}>Copy Link</button>
        </div>
        {referrals.length > 0 ? (
          <ul>
            {referrals.map((ref) => (
              <li key={ref.id}>
                <strong>Name:</strong> {ref.referred_user_name} | <strong>ID:</strong> {ref.referred_user_id}
              </li>
            ))}
          </ul>
        ) : (
          <p>No referrals yet.</p>
        )}
      </div> */}
        <h3>Referrals</h3>
    {(userInfo.status === 'approved') && (
  <div className="referral-info">
  
    <div>
      <h3>Refer and Earn</h3>
      <input type="text" value={referralLink} readOnly />
      <button onClick={copyToClipboard}>Copy Link</button>
    </div>
    {referrals.length > 0 ? (
      <ul>
        {referrals.map((ref) => (
          <li key={ref.id}>
            <strong>Name:</strong> {ref.referred_user_name} | <strong>ID:</strong> {ref.referred_user_id}
          </li>
        ))}
      </ul>
    ) : (
      <p>No referrals yet.</p>
    )}
  </div>
) || (
  <div className="referral-info">
    <p>Wait for admin approval</p>
  </div>
)}
    </div>
  );
};

export default MyInfo;
