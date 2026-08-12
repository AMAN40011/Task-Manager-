import jwt from "jsonwebtoken";

export const jsonwebtokeGenerator = (id, res) => {
  try {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

     return token;


  } catch (error) {
    res.status(400).json({ message: "Error while generating token" });
  }
};
