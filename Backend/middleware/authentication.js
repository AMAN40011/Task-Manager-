import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const authenticationUser = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Token Doesn't exist" });
    }

    const tk = jwt.verify(token, process.env.SECRET_KEY);

    const user =await User.findById(tk.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    req.user = user;
   

    next();

  } catch (error) {
    res.status(400).json({ message: error.message || "User Authentication Failed" });
  }
};
