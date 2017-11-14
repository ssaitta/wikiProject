'use-strict'

const express = require('express');
const app = express();

const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
//const fs = require('fs'); //may or may not need this. may be included in node
const path = require('path');
const models = require('./models');  //this is going to give us access to Pages and Users only through models.Page/models.Users
//If you want to be able to just call Page and Users you need to save them in a var with var Page = models.Page ect.
const routes = require('./routes');

app.engine('html', nunjucks.render); //where do you want to render using a specific template
app.set('view engine', 'html') //where to find the template and what file exrension the templates have
nunjucks.configure('views', {noCache: true});

// logging middleware
app.use(morgan('dev'));

//
app.use(express.static(path.join(__dirname, '/public')));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
app.use(routes); //our routes/index.js


app.get("/",function(req, res, next){
    res.redirect("/wiki")
})

app.use(function(err,req,res,next){ //catch all error handeling function
    console.error(err);
    res.status(500).send(err.message)
})




//syncing app.js with our models
models.Page.sync({}) //removed force : true and  it logged
.then(()=>{return models.User.sync({})})
    .then(function () {
        app.listen(3000, function () {
            console.log('Server is listening on port 3000!');
        });
})
    .catch(console.error);
