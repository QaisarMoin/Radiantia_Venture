
import '../../CSS/MyProfile.css';

const ProfileCard = ({ name, mobile, email, imageUrl, club , totalIncome}) => {
  console.log(name, mobile, email, imageUrl);
  
  return (
    <>
    <div className='profileCardFlex'>
    <div className="card ">
      <div className="card-content">
        <div className="image-container">
          <img src={imageUrl} alt={`${name}'s profile picture`} className="profile-image" />
        </div>
        <div className="info-container">
          <h2 className="name">{name}</h2>
          <div className="contact-info">
            <p className="mobile">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              {mobile}
            </p>
            <p className="email">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {email}
            </p>
          </div>
        </div>
      </div>
          <p className="club"><strong>Club Name:</strong> {club || 'Pending'}</p>
    </div>
    <div className="card">
      <div className="card-content">

        <div className="info-container">
          <h2 className="name">Total income</h2>
          <div className="contact-info">

          <h2>₹ {totalIncome}</h2>
          </div>
        </div>
      </div>
          <p className="club"><strong>5% maintenance charge will be deducted from the total income, and the remaining amount will be shown.</strong></p>
    </div>
    </div>
    </>
  );
};

export default ProfileCard;

