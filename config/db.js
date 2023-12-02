const mongoose = require("mongoose");
const Terminal = require("terminal-kit");

const term = Terminal.terminal;

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    term.bold("Database connected\n");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDB };
