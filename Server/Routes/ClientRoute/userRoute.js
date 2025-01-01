const express = require('express');
const router = express.Router();
const userController = require('../../Controller/userController'); // Import controller functions

// Define routes
router.get('/user/:id', userController.getUserInfo);
router.get('/user/:id/referrals', userController.getUserReferrals);
// router.post('/user/:id/referrals', userController.addReferral);
router.get('/referral/:id', userController.getReferralLink);

router.post('/updatePromotion', userController.updatePromotion);

router.post('/Contact/form', userController.contactUs);

module.exports = router;
