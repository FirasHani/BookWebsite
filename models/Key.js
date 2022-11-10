const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Key =new Schema(

{
    Key:{
       type:String
    },
    Name:{
        type:String
    }



}
)
const KeyR = mongoose.model('KeyR',Key)

module.exports=KeyR