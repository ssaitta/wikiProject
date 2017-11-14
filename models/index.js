const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging : false
});

const User = db.define('user', {
    name: {
        type : Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false,
        validator:{
            isEmail: true
        }
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
    getterMethods:{ //make sure you spelled this right it's not arbitrary!
        route: function() {return ('/wiki/'+ this.urlTitle)} //we can use this as a regular property now Page.route
    },
    hooks:{
        beforeValidate: function(page){
            var pageTitle = page.title;
            function generateUrlTitle (title){
            if(title){
                  // Removes all non-alphanumeric characters from title
                  // And make whitespace underscore
                  return page.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, ''); //these regex are removing all space with _ and all whitespace with nothing
                } else {
                  // Generates random 5 letter string
                  return page.urlTitle = Math.random().toString(36).substring(2, 7);
                }
              }
            
            generateUrlTitle(pageTitle)
        }
    }}
)

Page.belongsTo(User, {as : 'author'}); //This adds a column to Page called authorId which is the forign key associated with User's primary Key Id This as is just like a SQL allis but it will also define the column header and it will also be how you call on setAuthor/getAuthor/deleteAuthor ect.


module.exports = {
    Page: Page,
    User: User
};

