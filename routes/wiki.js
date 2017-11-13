const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res, next) {
    //res.send('got to GET /wiki/');
    //res.render('wikipage')
    res.redirect('/');
  });
  
  routes.post('/', function(req, res, next) {
    
    res.send('got to POST /wiki/');
  });
  
  routes.get('/add', function(req, res, next) {
    res.render('addpage.html');
    //res.send('got to GET /wiki/add');
  });

module.exports = routes