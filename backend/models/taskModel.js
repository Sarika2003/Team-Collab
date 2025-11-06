const mongoose  = require("mongoose");

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
   description:{
    type:String,
    required:true,
  }, 
  status:{
    type: String,
    enum:["To do" , "In Progress","Done"],
    default:"To do",
    required:true,
  },
   priority:{
    type:String,
    enum:["Low" , "Medium","High"],
    default:"low",
    required:true,
  },
   assignedTo:{
    type:String,
    required:true,
  }, 
  dueDate:{
    type:Date,
    default: () => Date.now(),
    required:true,
  },
  boardId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
 createdAt:{
    type: Date,
    default: () => Date.now(),
 }
});


const taskModel = mongoose.model("task" , taskSchema);

module.exports=taskModel ;