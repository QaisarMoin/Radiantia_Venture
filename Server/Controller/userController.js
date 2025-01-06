const db = require('../Config/DB'); // Assume db is your MySQL connection instance
const util = require('util');
const query = util.promisify(db.query).bind(db);

// Get User Info
exports.getUserInfo = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  console.log(userId, "Received userId");

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const result = await query(
      `SELECT 
        u.club_name, 
        u.name, 
        u.email, 
        u.mobile_no, 
        u.profile_img, 
        u.status,
        u.custom_id, 
        i.company_promotion, 
        i.direct_income, 
        i.level_income, 
        i.smart_cto, 
        i.franchise_income, 
        i.rank_and_reward, 
        i.re_top_up_income 
      FROM users u 
      LEFT JOIN incomes i ON u.id = i.user_id 
      WHERE u.id = ?`,
      [userId]
    );

    // console.log(result, "Query Result");

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result[0]); // Send the first row of the result
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Referrals
exports.getUserReferrals = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  console.log(userId, "Received userId");

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const referrals = await query(
      `SELECT r.id, r.user_id ,r.referred_user_id, r.referral_income, u.name AS referred_user_name
       FROM referrals r
       JOIN users u ON r.referred_user_id = u.id
       WHERE r.user_id = ?`,
      [userId]
    );

    console.log(referrals, "Query Result");

    res.json(referrals); // Send the clean data directly
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add Referral
exports.addReferral = async (req, res) => {
  const userId = req.params.id;
  const { referredUserId } = req.body;

  try {
    await db.query(
      `INSERT INTO referrals (user_id, referred_user_id, referral_income) VALUES (?, ?, 500)`,
      [userId, referredUserId]
    );

    res.json({ message: 'Referral added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReferralLink = (req, res) => {
  const userId = req.params.id; // Assume user ID is retrieved from a validated JWT or session
  console.log(userId, "Received userId");
  

  try {
    // Generate the referral link
    const referralLink = `https://rmpl.net.in/register?referralId=${userId}/user-registration`;
    
    res.json({ referralLink });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePromotion = async(req, res) => {
  const { userId, selectedPlatforms } = req.body; // Expect user ID and platforms from frontend

  if (!userId || !selectedPlatforms || selectedPlatforms.length === 0) {
    return res.status(400).json({ message: 'Invalid data. Please select platforms.' });
  }

  try {
    // Insert each selected platform into the database
    const values = selectedPlatforms.map(platform => [userId, platform, new Date()]);
    await db.query(
      'INSERT INTO social_media_promotions (user_id, platform_name, promotion_date) VALUES ?',
      [values]
    );

    res.status(200).json({ message: 'Promotion data submitted successfully!' });
  } catch (error) {
    console.error('Error submitting promotion data:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }

}

exports.contactUs = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const result = await query(
      'INSERT INTO contact_us (name, email, message, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, message]
    );
    // console.log('Contact form data inserted:', result.insertId);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};


