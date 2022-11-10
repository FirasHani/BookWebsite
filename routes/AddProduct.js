const express = require('express')
const router = express.Router()
const {ensureAuthenticated}=require('../config/auth')
const customerModel=require('../models/customerModel')
const ProductModel=require('../models/Products')
const CartModel=require('../models/Cart')
const { findById } = require('../models/customerModel')

//  Load Page :- AddProduct
router.get('/AddProduct',ensureAuthenticated,(req,res)=>{

    res.render('AddProduct')
})
// POST for: AddProduct
router.post('/',ensureAuthenticated,async(req,res)=>{
   
    
    //  console.log('name is   ',test)
        if(req.user.username=='firas'){
           await ProductModel.create(req.body)
            res.redirect('/dashbord/dashbord')
            console.log('worked')
        }
        else{
            res.redirect('/dashbord/dashbord')
            console.log('didnt work worked')
        }
       
})




module.exports=router