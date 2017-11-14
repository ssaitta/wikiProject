const express = require('express')
const routeApp = express.Router()
const wiki = require('./wiki.js')
const users = require('./users.js')
const models = require('../models')
const Page = models.Page;
const User = models.User;

routeApp.use('/wiki', wiki) //this is so we don't have to write /wiki before all wiki routes
routeApp.use('/users',users)




module.exports = routeApp



//use the routes with pages.routes/users.routes