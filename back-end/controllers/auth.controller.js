const httpStatus = require('http-status');
const {authService} = require('../services');


const registerUserContoller = (async (req,res) =>{
    const response = await authService.registerUserService(req?.body?.data);
    res.status(httpStatus.OK).send(response);
});

const loginUserContoller = (async (req,res) =>{
    const response = await authService.loginUserService(req?.body?.data);
    res.status(httpStatus.OK).send(response);
});

module.exports = {
    registerUserContoller,
    loginUserContoller
};
