'use-strict'

const express = require('express');
const app = express();

const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const fs = require('fs'); //may or may not need this. may be included in node
const path = require('path');
const models = require('./models');
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

app.get('/', function(req, res, next){
    res.send('wddup it\'s fridayyy!!!')

});



//syncing app.js with our models
models.db.sync({})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
