const express= require('express')
const routerUser = express.Router()

const ControllerUser = require('../controllers/users.js')                          


routerUser.post('/signup',ControllerUser.signup);
routerUser.post('/login',ControllerUser.login);

// router.post('/signup',userCtrlers.signup)




module.exports = routerUser