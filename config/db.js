import mongoose from "mongoose";

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};

export { connectDB };
