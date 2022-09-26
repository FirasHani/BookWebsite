const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const books =new Schema(

{
    bookName:{
        type:String
    },
    bookDate:{
        type:Date
    },  
    bookType:{
        type: String,
        enum: ['IT', 'ENG'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      Take:{
        type:Array,
        default:'false',
        // enum: ['true', 'false'],
      },
      CreatdBy:{
        type:Array
      }
      

}
)
const booksR = mongoose.model('booksR',books)

module.exports=booksR