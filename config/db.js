import mongoose from "mongoose";
import Terminal from "terminal-kit";

const term = Terminal.terminal;

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    term.bold("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};

export { connectDB };
