const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
// const customerR=require('../models/customerModel')

// customerModel 
const customerModel=require('../models/customerModel')


//  LOAD Page :- register
router.get('/register',(req,res)=>{
    res.render('register')
   })
//POST register
router.post('/register',(req,res)=>{
    const {username,password,password2}=req.body
    let errors=[]

    if(!username || !password){
        errors.push(1)
    }
    if(password !=password2 ){
        errors.push(1)
    }
    if(password.length<6){
        errors.push(1)
    }
    if(password2.length<6){
        errors.push(1)
    }
    if(errors.length>0){
        res.render('register',{
            username,
            password,
            password2
        })
    }
    else{
        customerModel.findOne({
            username:username
        })
        .then(user=>{
            if(user){
                errors.push()
                res.render('register')
            }
            else{
                const customer=new customerModel({
                    username,
                    password
                })
            //hash password
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(customer.password,salt,(err,hash)=>{
                    if (err) throw err;
                    customer.password=hash

                    customer.save()
                    .then(user=>{
                        res.redirect('/user/loginpage')
                    })
                    .catch(err => console.log(err) )
                })
            })    
            }
        })
    }


   })

      // Load Page :- loginpage
router.get('/loginpage',(req,res)=>{


    res.render('loginpage')
    
   })
// POST for: login
router.post('/loginpage',async(req,res,next)=>{
    

    passport.authenticate('local', {
        successRedirect:'/dashbord/dashbord',
        failureRedirect: '/user/loginpage', 
      })(req, res,next);
    
    
   
})
//Logout
router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect('/user/loginpage');
    });
  });
module.exports = router;