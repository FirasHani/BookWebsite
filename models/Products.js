
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product =new Schema(

{
    
    ProductName:{
        type:String
    },
    ProductPrice:{
        type:Number,
    },
    ProductAmount:{
        type:Number
       
    },
    ProductType:{
        type:String,
        enum:['shoe','pant']
    }, 

    
}
)
const ProductModel = mongoose.model('ProductModel',Product)

module.exports=ProductModel