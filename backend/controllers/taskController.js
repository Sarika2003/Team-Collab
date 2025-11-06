const taskModel = require("../models/taskModel")
const boardModel= require("../models/boardModel");

//get all tasks
const getAllTasks=async (req,res)=>{

  try {
     
     const tasks = await taskModel.find();
     res.json({ status: 1, message: "all tasks", data: tasks });
   } catch (error) {
     res.status(500).json({ status: 0, message: "Error fetching tasks", error: error.message });
   }
}


//create tasks

const createTasks = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, dueDate, boardId } = req.body;

    if (!title || !description || !status || !priority || !assignedTo || !dueDate || !boardId) {
      return res.status(400).json({ status: 0, message: "All fields are required." });
    }

 
    const board = await boardModel.findById(boardId);
    if (!board) {
      return res.status(404).json({ status: 0, message: "Board not found." });
    }

    const newTask = new taskModel({
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      boardId: board._id,
    });

    await newTask.save();

    await newTask.populate({
      path: "boardId",
      model: "board",
    });

    return res.status(201).json({
      status: 1,
      message: "New task created successfully",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Error while creating task",
      error: error.message,
    });
  }
};


//update tasks
 const updateTasks= async(req,res)=>{
   try {
    const taskID = req.params.id;
    const { title, description, status, priority, assignedTo ,dueDate, boardId } = req.body;


    const task = await taskModel.findOne({ _id: taskID });
    if (!task) {
      return res.status(403).json({ status: 0, message: "cannot find the task" });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.assignedTo = assignedTo;
    task.dueDate = dueDate;
    task.boardId = boardId;
    

    await task.save();

    res.status(200).json({ status: 1, message: "task updated successfully", data: task });
  } catch (e) {
    console.error("Error updating task:", e); 
    res.status(500).json({ status: 0, message: "Error updating task", error: e.message });
  }
}

//delete tasks
const deleteTasks= async(req,res)=>{
  try {
    const taskID = req.params.id;

    const task = await taskModel.findOne({ _id: taskID });
    if (!task) {
      return res.status(403).json({ status: 0, message: "no task found" });
    }

    await taskModel.deleteOne({ _id: taskID });

    res.status(200).json({ status: 1, message: "task deleted successfully" });
  } catch (e) {
    res.status(500).json({ status: 0, message: "Error deleting task", error: e.message });
  }
}

module.exports = {getAllTasks,createTasks,updateTasks,deleteTasks};