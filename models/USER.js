const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student =new Schema(

{
    IDnumber:{
        type:Number
    },
    username:{
        type:String
    },
    password:{
        type:String,
    }


}
)
const studentR = mongoose.model('studentR',student)

module.exports=studentR