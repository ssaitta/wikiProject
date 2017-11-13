const express = require('express')
const routeApp = express()
const wiki = require('./wiki.js')
const users = require('./users.js')

routeApp.use('/wiki',wiki)
routeApp.use('/users',users)




module.exports = {
    wiki : wiki,
    users: users
}


//use the routes with pages.routes/users.routes