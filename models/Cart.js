const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart =new Schema(

{

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      Full:{
        type: mongoose.Schema.Types.ObjectId,
      }

}
)
const CartModel = mongoose.model('CartModel',Cart)

module.exports=CartModel