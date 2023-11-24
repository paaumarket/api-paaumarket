import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
// import { cloudinary } from "../config/cloudinary.js";

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("This field are required");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      throw new Error("User already exist with this credentials");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = User({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    res
      .status(200)
      .send({ message: "Account created successfully!", user: savedUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export { createUser, loginUser, updateUser };
