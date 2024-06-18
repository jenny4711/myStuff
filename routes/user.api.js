const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/',userController.autoSignUpIOS);
router.get('/getUser/:email',userController.getUserIOS)

module.exports=router;