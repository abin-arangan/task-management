const httpStatus = require('http-status');
// const catchAsync = require('../lib/catchAsync');
const {taskService} = require('../services');

// catchAsync
const getTaskDetailsContoller = (async (req,res) =>{
    const response = await taskService.getTaskDetailsService(req?.query);
    console.log('controller resp:',response);
    res.status(httpStatus.OK).send(response);
});

module.exports = {
    getTaskDetailsContoller
};
