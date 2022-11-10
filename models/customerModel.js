const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer =new Schema(

{
    username:{
        type:String
    },
    password:{
        type:String,
    }
    

}
)
const customerModel = mongoose.model('customerModel',customer)

module.exports=customerModel