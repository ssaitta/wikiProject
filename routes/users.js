const express = require('express')
const routes = express.Router()
const models = require('../models')
const Page = models.Page
const User = models.User

module.exports =  routes

routes.get('/:userId',function(req, res,next){
    let userPromise = User.findById(req.params.userId)
    // .then((foundUser)=>{
       
    //     if(foundUser===null){
    //         console.error(new Error("That User does not exist.") )
    //     }
    //     else{
    //        //res.render('user',{users : foundUser}) 
    //        return foundUser;
    //     }
        
    // })
    // .catch(next)    //to use this you MUST have next as a param in the original GET.

    //symoltanious Promises
    let pagePromise = Page.findAll({
        where:{
            authorId : req.params.userId
        }
    })
    // .then((foundPages)=>{
    //     if(foundPages===null){
    //         console.error(new Error("That User does not have any pages yet.") )
    //     }
    //     else{
    //        //res.render('user',{users : foundUser}) 
    //        return foundPages;
    //     }
    // })
    // .catch(next)
    console.log(userPromise);
    console.log(pagePromise);
    Promise.all([userPromise,pagePromise]) //to do promise all you have to save you other unresolved promises in variables
    .then((data)=>{
        console.log("user: ",data[0]); //right now this is Null
        console.log("page: ",data[1]); //and this is an empty array
        let userPromise = data[0]
        let pagePromise = data[1]
        
        res.render('user',{users: userPromise, pages: pagePromise})
    })
    .catch(next)
})