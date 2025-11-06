const express = require("express");
const {
  getAllTasks,
  createTasks,
  updateTasks,
  deleteTasks
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", createTasks);
taskRouter.put("/:id", updateTasks);
taskRouter.delete("/:id", deleteTasks);

module.exports = taskRouter;