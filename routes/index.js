const express = require('express')
const routeApp = express.Router()
const wiki = require('./wiki.js')
const users = require('./users.js')

routeApp.use('/wiki', wiki)
routeApp.use('/users',users)




module.exports = routeApp


//use the routes with pages.routes/users.routes