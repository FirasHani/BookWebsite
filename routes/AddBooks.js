const express = require('express');
const router = express.Router();
const {ensureAuthenticated}=require('../config/auth')
const booksR=require('../models/addbooks')
const studentR=require('../models/USER')





const { model } = require('mongoose');

const multer=require('multer');
const keys = require('../config/keys')
const upload=multer({dest:'./hi'})
const KeyR=require('../models/Key')

const { uploadFile ,getFileStream} = require('./s3')


//  Load Page :- AddBooks
router.get('/AddBooks',ensureAuthenticated,async(req,res)=>{
    const test=await booksR.find({user:req.user.id}).lean()
    const testt=req.user.username
    const testID=req.user.IDnumber
    console.log('testID ()',testID)

    res.render('AddBooks',{testt,testID})
})

// POST for: AddBooks
router.post('/',upload.single('file'),ensureAuthenticated,async(req,res)=>{
    try{

      


        req.body.user=req.user.id
        await booksR.create(req.body)

        // const create=new booksR({
        //     bookName:req.body.bookName,
        //     bookType:req.body.bookType,
        //     ImageKey:ImageKey

        // })
        // create.save()



        res.redirect('dashbord/dashbord')
    }catch(err){
        console.log(err)
    }
})

//  LOAD Page :-Show All books for IT
router.get('/IT',ensureAuthenticated,async(req,res)=>{
   
        const showbooks=await booksR.find({bookType:'IT'}).lean()

        let typeS='IT'
        const names=req.user.username
        const IDstudent=req.user.IDnumber
 
    res.render('test',{showbooks,names,IDstudent,typeS})
   
      
    
})
//  LOAD Page :- Show All books for ENG
router.get('/ENG',ensureAuthenticated,async(req,res)=>{
   
    const showbooks=await booksR.find({bookType:'ENG'}).lean()

        let typeS='ENG'
    
        const names=req.user.username
        const IDstudent=req.user.IDnumber
    
  
    res.render('test',{showbooks,names,IDstudent,typeS})
   
})
//  LOAD Page :- SHOW edit book Page
router.get('/edit/:id',ensureAuthenticated, async(req,res)=>{
    const book=await  booksR.findById( req.params.id).lean()

await studentR.findOne({user:req.IDnumber}).lean()
const names=req.user.IDnumber
book.have=names

console.log('user name : ',names)


    if(!book){
        console.log('no book here')
    }
    if(book.user !=req.user.id){
        console.log('cant have acsses')
        
    }
    if(book.user ==req.user.id || names==202011077){
        console.log('yess')
        res.render('edit',{
            book,
            names
        }
            
        )
    }  


   


})
//  PUT Page :- Edit book
router.put('/:id',ensureAuthenticated,async(req,res)=>{
    let book =await booksR.findById(req.params.id).lean()


    await studentR.findOne({user:req.username}).lean()
    const names=req.user.IDnumber
 

    if(!book){
        console.log('no book here')
    }
    if(book.user !=req.user.id ){
        console.log('cant have acsses')
        
       
    }

    if(book.Take =='false' || names==202011077 ){
        console.log('update before ',book.Take)
            
            book =await booksR.findOneAndUpdate({_id: req.params.id},req.body,{
                new:true,
                runValidators:true,
               
            })
         
       
    }
  console.log('update after ',book.Take)

    res.redirect('/dashbord/dashbord')
})

//  Delete Books 
router.delete('/:id',ensureAuthenticated,async(req,res)=>{
    try{
        await booksR.remove({_id:req.params.id})
        
        res.redirect('/dashbord/dashbord')
    }catch(err){
        console.error(err)
    }
})


module.exports = router;



