const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');


// studentR 
const studentR=require('../models/USER')


//  Load Page :- register
router.get('/register',(req,res)=>{
    res.render('register')
   })

   // Load Page :- loginpage
router.get('/loginpage',(req,res)=>{
    res.render('loginpage')
   })


// POST for: register
router.post('/register',(req,res)=>{
    const {IDnumber,username,password,password2}=req.body
    let errors=[]
    if(!IDnumber || !username || !password){
        errors.push()
    }
    if(password !=password2 ){
        errors.push(1)
    }
    if(IDnumber.length !=9){
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
            IDnumber,
            username,
            password,
            password2
        })
    }
    else{
        studentR.findOne({
            IDnumber:IDnumber
        })
        .then(user=>{
            if(user){
                errors.push()
                res.render('register')
            }
            else{
                const student=new studentR({
                    IDnumber,
                    username,
                    password
                })
            //hash password
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(student.password,salt,(err,hash)=>{
                    if (err) throw err;
                    student.password=hash

                    student.save()
                    .then(user=>{
                        res.redirect('/users/loginpage')
                    })
                    .catch(err => console.log(err) )
                })
            })    
            }
        })
        }
})

// POST for: login
router.post('/loginpage',(req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashbord/dashbord',
        failureRedirect: '/users/loginpage',
      })(req, res,next);
})

//Logout
router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect('/users/loginpage');
    });
  });





module.exports = router;