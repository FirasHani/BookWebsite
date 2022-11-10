const express = require('express');
const router = express.Router();
const {ensureAuthenticated}=require('../config/auth')
const booksR=require('../models/addbooks')
const studentR=require('../models/USER')
const { uploadFile ,getFileStream} = require('./s3')

//  Load Page :- dashbord
router.get('/dashbord',ensureAuthenticated,async(req,res)=>{
    await studentR.findOne({user:req.username}).lean()
    const names=req.user.IDnumber
    const studentName=req.user.username
    
console.log('admian',studentName)
    if(names == 202011077){

booksR.find()
.then((user)=>{
    res.render("dashbord",{showbooks:user,studentName})
})
.catch((err) => {
    console.log(err);
  });

    }
else{
    try{
   const showbooks=await booksR.find({user:req.user.id}).lean()
   const studentName=req.user.username

   
 


   res.render('dashbord',{
    studentName,
    showbooks
   })
}catch(error){
    console.log(err)
}
}
})
///////////////////////






module.exports = router;



