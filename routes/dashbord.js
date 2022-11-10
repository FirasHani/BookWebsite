const express = require('express');
const router = express.Router();
const {ensureAuthenticated}=require('../config/auth')
const customerModel=require('../models/customerModel')
const ProductsModel=require('../models/Products')
const CartModel=require('../models/Cart');
const { findById } = require('../models/customerModel');

//  Load Page :- dashbord
router.get('/dashbord',ensureAuthenticated,async(req,res)=>{
   
const name=req.user.username
const name2=req.user.id
const name3='hi'

    ProductsModel.find()
    .then((products)=>{
        res.render('dashbord',{showproducts:products,name,name2,name3})
    })
//   res.render('dashbord',{name3})

})

router.get('/Cart',ensureAuthenticated,async(req,res)=>{

    const showproducts= await CartModel.find({user:req.user.id}).lean() 
    
    const newCart=new CartModel(req.body)
    


    const  wdasa  = await ProductsModel.find().lean()
    

 

    let newVariable =[]

      showproducts.forEach  (item=>{

        const test=item.Full
       

        newVariable.push(test)
        // console.log('wwww  ',test)
       
    })
   
    
    let show=[]
   for(var i=0;i<newVariable.length;i++){
    // console.log('firas  ',newVariable[i])
        const  showproducts2  = await ProductsModel.find({_id:newVariable[i]}).lean()
        
        show.push(showproducts2)
        
   }



for(var i=0;i<show.length;i++){
   console.log('test show before ',show[i])
}







let FullPrice=[]
let FullAmoaunt=[]
let FullId=[]
var all
show.forEach(item=>{
    item.forEach(test=>{

     FullPrice.push(test.ProductPrice)
     FullAmoaunt.push(test.FullAmoaunt-1)

        FullId.push(test._id)
    })
})

// for(var i=0;i<FullId.length;i++){
    
//     await CartModel.findOneAndUpdate({_id:FullId[i]})


//  }
 
let sum=0

for(const value of FullPrice){
    sum+=value
}

console.log('sum = ',sum)

res.render('Cart',{show})
    
    
})
router.put('/',ensureAuthenticated,async(req,res)=>{
        const newCart=new CartModel(req.body)
        
       const savecart=await newCart.save()

       res.redirect('/dashbord/dashbord')
    
}) 


module.exports=router






















// const test=await customerModel.findOne({user:req.username})
// // const test=req.user.username
// console.log('nameeeeeee is (in passport)',test)




// const shownames =await customerModel.find({username:'firas'}).lean()
// const shownames2 =await customerModel.find({username:'noor'}).lean()


//  shownames.forEach(item=>{
//      shownames2.forEach(item2=>{

     
//      const test =item.password
//      console.log('yesssssssssssss  ',test)

//      const test2 =item2.username
//      console.log('yesssssssssssss  ',test2)
//  })
//  })