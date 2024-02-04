const express = require('express');
const routes = express();

const controller =require('../controllers/controllers');


routes.get('/',controller.homePage);

routes.post('/',controller.checkUser);

routes.get('/register',controller.registerPage);

routes.post('/register',controller.insertUser);

routes.get('/dashboard',controller.loadDashboard);

routes.get('/logout',controller.logout);




module.exports = routes;
