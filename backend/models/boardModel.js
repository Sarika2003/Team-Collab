const mongoose  = require("mongoose");

const boardSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
 createdAt:{
    type: Date,
    default: () => Date.now(),
 }
});


const boardModel = mongoose.model("board" , boardSchema);

module.exports=boardModel ;