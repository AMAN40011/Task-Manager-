import User from "../model/user.js";
import { z } from "zod";
import bcrypt from "bcrypt"
import {jsonwebtokeGenerator} from '../jwt/token.js';

const UserSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be 3 characters long"
    }),

    email: z.string().email({
        message: "Enter a genuine email"
    }),

    password: z.string().min(6, {
        message: "Password must be 6 characters long"
    })
});

export const register = async (req, res) => {
    try {
        // Validate request body
        const result = UserSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }

        // Get validated data
        const { username, email, password } = result.data;

        // Check existing user
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }
         
        //Password hashing
        const hashPassword=await bcrypt.hash(password,10);


        // Create user
        const newUser = new User({
            username,
            email,
            password:hashPassword
        });

        // Save user
        await newUser.save();
        const token= jsonwebtokeGenerator(newUser._id,res);
         
        return res.status(201).json({
            message: "User registered successfully",token
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to register user"
        ,error});
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Find user
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "User not found with this email"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Password is not matching"
            });
        }

       const token= jsonwebtokeGenerator(user._id,res);

        return res.status(200).json({
            message: "User login successfully",token
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to login"
        });
    }
};


export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            path: "/"
        });

        return res.status(200).json({
            message: "Logout successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to logout"
        });
    }
};