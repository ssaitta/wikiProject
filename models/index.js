const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging : false
});

const User = db.define('user', {
    name: {
        type : Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false
    }
});

const Page = db.define('page', {
    title: { 
        type: Sequelize.STRING, allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'), defaultValue: 'closed'
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }},
    {
    //options
    getterMethod:{
        route: function() {return ('/wiki/'+ this.urlTitle)}
    },
    hooks:{
        beforeValidate: function(page, options){
            var pageTitle = page.title;
            function generateUrlTitle (title){
            if(title){
                  // Removes all non-alphanumeric characters from title
                  // And make whitespace underscore
                  return page.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
                } else {
                  // Generates random 5 letter string
                  return page.urlTitle = Math.random().toString(36).substring(2, 7);
                }
              }
            
            generateUrlTitle(pageTitle)
        }
    }
    }
)

module.exports = {
    db
};

