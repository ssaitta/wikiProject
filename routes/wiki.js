const express = require('express')
const routes = express.Router()
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
//console.log(models.Page.title)

routes.get('/', function(req, res, next) {
    Page.findAll({}) //Select * from pages
    .then(function (pages){
        res.render('index', {pages: pages} );
    })
    .catch(next)
});
  

routes.get('/add', function(req, res, next) {
res.render('addpage.html');
});


routes.get('/:urlTitle', function(req, res, next) {
    Page.findOne({ //when you use these Sequalize methods in your HTTP requests you need to start a promise chain
        where: { 
            urlTitle: req.params.urlTitle 
        } 
    })
    .then((foundPage)=>{
    if(foundPage===null){
        return next(new Error('Oh no, we don\'t have a page for that.' ))
    }
    res.render('wikipage',{page : foundPage});
    })
    .catch(next);

});
  

routes.post('/', function(req, res, next) {
    //creating a new instance (record) for the Page table using build
    //console.log(req.body)
    var author = User.findOrCreate({ //lets find a user in our databse with this name and email. If it finds it resolve to that user
        where: {
            name: req.body.authorName,
            email: req.body.authorEmail
        }
    })
        .spread((user,created)=>{  //the successful track for the findOfCreate Promise 
            //now create our page using this user.
            return Page.create({        //make sure to return this and what it returns is a created page
                title: req.body.title,
                content: req.body.content
                //status: req.body.status
            })
            .then((createdPage)=>{ //now related this page to it's author in the users table
                return createdPage.setAuthor(user) //this is a method given to us using the allis and belongsTo function
            })
            .then((createdPage)=>{
                res.redirect(createdPage.route);
            })
        
        }).catch(next);
  
    // var newPage = Page.build({           ///////we don't need this anymore this was the newPage without user info.
    //     title: req.body.title,
    //     content: req.body.content
        
    // });
    // //build doesn't save this newly created instandce automatically you have to call .save
    // newPage.save()
    // .then(function (data){
    //     res.redirect(data.route) //this will redirect to the newly created page after it has been saved (using getter method route.)
    // })
    // .catch(function(err){
    //     console.log("something went wrong:", err)
    // })

})



module.exports = routes;



