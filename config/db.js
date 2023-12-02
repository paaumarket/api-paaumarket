const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected\n");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDB };
