import express from 'express';
import { login, logout, register } from '../controller/user.js';
import { ro } from 'zod/v4/locales';

const router=express.Router();

router.post("/signup",register);
router.post('/login',login);
router.get('/logout',logout);

export default router;