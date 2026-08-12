import express from 'express';
import { createTodo, deleteTodo, fetchTodo, updateTodo } from '../controller/todo.js';
import {authenticationUser} from '../middleware/authentication.js';
const router=express.Router();

router.post("/create",authenticationUser,createTodo);
router.get("/fetch",authenticationUser,fetchTodo);
router.put("/update/:id",authenticationUser,updateTodo);
router.delete("/delete/:id",authenticationUser,deleteTodo);

export default router;