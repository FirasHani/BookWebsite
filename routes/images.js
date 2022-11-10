const express=require('express');
const { model } = require('mongoose');

const multer=require('multer');
const keys = require('../config/keys');
const upload=multer({dest:'./hi'})
const KeyR=require('../models/Key')
const router = express.Router();
const {ensureAuthenticated}=require('../config/auth')
const { uploadFile ,getFileStream} = require('./s3')

router.get('/images',ensureAuthenticated,async(req,res)=>{
   
    const result=KeyR.find().then(test=>{
        res.render('play',{test})
    })
    
   

    })

//get 
router.get('/images/:key',ensureAuthenticated,(req,res)=>{
    try {
        

// res.render('play')
const key = req.params.key
const readStream = getFileStream(key)


//  console.log('test ',images)

readStream.pipe(res)
// res.render('show',{readStream})

    } catch (error) {
        console.log(error)
    }

}) 

router.get('/upload',ensureAuthenticated,async(req,res)=>{
   
    
        res.render('upload')
  
})

//post
router.post('/',upload.single('file'),ensureAuthenticated,async(req,res)=>{

   

    const file=req.file
    // console.log(file)


    const result = await uploadFile(file)

    console.log(result.Key)
    const Key=result.Key

   

    const key=new KeyR({
        Key:Key,
      
    })
    key.save().then(user=>{
        res.redirect("/dashbord/dashbord")
    }) 

    // res.send({imagePath: `/images/${result.Key}`})
   
})



module.exports = router