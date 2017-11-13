const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res, next) {
    //res.send('got to GET /wiki/');
    //res.render('wikipage')
    res.redirect('/');
  });
  
  // routes.post('/', function(req, res, next) {
  //   res.json(req.body.content)
  //   //res.send('got to POST /wiki/');
  // });
  
  routes.get('/add', function(req, res, next) {
    res.render('addpage.html');
    //res.send('got to GET /wiki/add');
  });

//   var models = require('../models');
//   var Page = models.db.Page; 
//   var User = models.db.User; 
  
//   routes.post('/', function(req, res, next) {

  
//     var page = Page.build({
//       title: req.body.title,
//       content: req.body.content
//     });
  
//     STUDENT ASSIGNMENT:
//     make sure we only redirect *after* our save is complete!
//     note: `.save` returns a promise or it can take a callback.

//     page.save()
//     .then(function(){
//       res.send('anything')
//     })
//     .then(function (){
//       res.redirect('/wiki')
//     })
//     .catch(function(err){
//       console.log("something went wrong:", err)
//     })

//   res.send('anything')

// })



module.exports = routes;



