const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Terminal = require("terminal-kit");
const { connectDB } = require("./config/db.js");

const userRoutes = require("./routes/userRoute.js");
const waitlistRoute = require("./routes/waitlistRoute.js");

// initialize app
const app = express();
dotenv.config();
const term = Terminal.terminal;

// Connect to MongoDB Database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// end-points
app.use("/api/user/", userRoutes);
app.use("/api/", waitlistRoute);

// Start Express Server
app.listen(process.env.PORT, () => {
  term.bold.green(`Server running on port ${process.env.PORT}\n`);
});
