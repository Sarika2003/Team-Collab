const boardModel= require("../models/boardModel");


// get board
const getAllBoards=async (req,res)=>{
  try {
    
    const boards = await boardModel.find();
    res.json({ status: 1, message: "All budgets", data: boards });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Error fetching boards", error: error.message });
  }
}

//create board
const createBoard= async(req,res)=>{
 try {
    const { name} = req.body;

    if (!name) {
      return res.status(400).send({ status: 0, message: "Name is required." });
    }

    const newBoard = new boardModel({ name });
    await newBoard.save();


    return res.status(201).json({
      status: 1,
      message: "New board created successfully",
      data: newBoard,
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 0,
      message: "Error while creating board",
      error: error.message,
    });
  }
}

module.exports = { getAllBoards, createBoard};

