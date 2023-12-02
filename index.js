const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");

const userRoutes = require("./routes/userRoute.js");
const waitlistRoute = require("./routes/waitlistRoute.js");

// initialize app
const app = express();
dotenv.config();

// Connect to MongoDB Database
connectDB();

// middlewares
app.use(
  cors({
    origin: "https://paaumarket.com.ng",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// end-points
app.use("/api/user/", userRoutes);
app.use("/api/", waitlistRoute);

// Start Express Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}\n`);
});
