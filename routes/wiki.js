const express = require('express')
const routes = express.Router()
var models = require('../models');
var Page = models.db.models.page; 
var User = models.db.models.user; 


routes.get('/', function(req, res, next) {
    res.redirect('/');
});
  
routes.get('/add', function(req, res, next) {
res.render('addpage.html');

});

routes.get('/:urlTitle', function(req, res, next) {

Page.findOne({ 
    where: { 
        urlTitle: req.params.urlTitle 
    } 
    })
    .then(function(foundPage){
    res.render('wikipage',{page : foundPage});
    //res.send(foundPage)
    })
    .catch(next);

});
  

routes.post('/', function(req, res, next) {


var page = Page.build({
    title: req.body.title,
    content: req.body.content
});

// STUDENT ASSIGNMENT:
// make sure we only redirect *after* our save is complete!
// note: `.save` returns a promise or it can take a callback.

page.save()
.then(function (data){
    console.log(data)
    var redirected = data.dataValues.urlTitle
    console.log(redirected)
    res.redirect('/wiki/' + redirected)
})
.catch(function(err){
    console.log("something went wrong:", err)
})

//res.send('anything')

})



module.exports = routes;



