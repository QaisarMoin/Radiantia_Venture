const express = require('express');
const router = express.Router();
const adminController = require('../../Controller/adminController'); 




router.get('/Allusers-list', adminController.fectAllUSer);

router.put('/updateUserStatus/:id', adminController.updateStatus);
router.delete('/removeUser/:id', adminController.removeUser);




module.exports = router;

