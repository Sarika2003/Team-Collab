const express = require("express");
const cors = require("cors");
const connectToDB = require("./connection/dbConnection");
const taskRouter = require("./routes/taskRoutes");
const boardRouter = require("./routes/boardRoutes");

const app = express();
connectToDB();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/boards", boardRouter);
app.use("/api/tasks",taskRouter);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*" , (req,res)=>{
    res.sendFile(path.join(__dirname , "../frontend" ,"dist" , "index.html"));
  })
}




const PORT=8000;

app.listen(PORT,()=>{
  console.log(`Server running at port ${PORT}`);
});