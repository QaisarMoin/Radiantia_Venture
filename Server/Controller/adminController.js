const db = require('../Config/DB'); 
const util = require('util');
const query = util.promisify(db.query).bind(db);


exports.fectAllUSer = async (req, res, next) => {
  try{
    const users = await query('SELECT * FROM users');
    res.json(users);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error please try after some time and contact developer' });
  }
}


exports.updateStatus = async (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;
  console.log(userId, status);

  if(!userId || !status){
    return res.status(400).json({ message: 'Invalid data Refresh Page and try again' });
  }

  try{
    await query('UPDATE users SET status = ? WHERE id = ?', [status, userId]);
    res.json({ message: 'User status updated successfully' });
  }catch(err){
    console.error(err);
    res.status(500).json({message: 'Server error please try after some time and contact developer'});
  }
}

exports.removeUser = async (req, res) =>{
  const userId = req.params.id;

  if(!userId){
    return res.status(400).json({ message: 'Invalid data Refresh Page and try again' });
  }
  try {
    // Temporarily disable foreign key checks
    await query('SET FOREIGN_KEY_CHECKS = 0');

    // Delete the user
    await query('DELETE FROM users WHERE id = ?', [userId]);

    // Re-enable foreign key checks
    await query('SET FOREIGN_KEY_CHECKS = 1');

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({
      message: 'Server error. Could not delete user. Please try again later.',
    });
}}
