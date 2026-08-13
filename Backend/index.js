import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from './routes/todo.js';
import cors from "cors";
import userRoute from './routes/user.js'
import cookieParser from "cookie-parser";


const app=express();
dotenv.config();
app.use(cookieParser());

app.use(cors({
     origin: "https://task-manager-41tz-nine.vercel.app", 
     credentials: true,
}));

const MB_URL=process.env.MongoDB;
try{
    await mongoose.connect(MB_URL);
    console.log("Server is Connected to Mongodb");
}catch(error){
    console.log(error);
}

//Middleware 
app.use(express.json());
app.use('/todo',todoRoute);
app.use('/user',userRoute);


app.get("/",(req,res)=>{
    console.log("Express app is running");
    res.send("Hello World");
})

const PORT=process.env.PORT || 3000 ;

app.listen(PORT ,()=>{
    console.log(`Server is running on port no ${PORT}`);
})