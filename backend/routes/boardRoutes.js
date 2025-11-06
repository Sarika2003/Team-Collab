const express = require("express");
const {
  getAllBoards,
  createBoard
} = require("../controllers/boardController");

const boardRouter = express.Router();

boardRouter.get("/", getAllBoards);
boardRouter.post("/", createBoard);

module.exports = boardRouter;