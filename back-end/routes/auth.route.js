const express=require("express");
const {authContoller} = require('../controllers');
const router = express.Router();

router.post('/registerUser',authContoller.registerUserContoller);
router.post('/loginUser',authContoller.loginUserContoller);

module.exports = router;