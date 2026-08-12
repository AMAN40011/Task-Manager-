import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema({
   
    text:{
        type:String,
        required:true
    },
    completed:{
       type:Boolean,
       required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    }


});

const Todo=mongoose.model("Todo",TodoSchema);

export default Todo;
