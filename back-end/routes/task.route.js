const express=require("express");
const {taskContoller} = require('../controllers');
const router = express.Router();

router.post('/getTaskDetails',taskContoller.getTaskDetailsContoller);

module.exports = router;

