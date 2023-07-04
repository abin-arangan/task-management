const express = require('express');
const taskDataRoute = require('./task.route');
const authRoute = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/taskData',
        route: taskDataRoute
    },
    {
        path: '/auth',
        route: authRoute
    }
];

defaultRoutes.forEach((route) =>{
    router.use(route.path, route.route);
});

module.exports = router;