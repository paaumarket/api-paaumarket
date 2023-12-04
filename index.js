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
app.options("*", cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-Requested-With",
      "Accept",
      "Accept-Version",
      "Content-Length",
      "Content-MD5",
      "Date",
      "X-Api-Version",
    ],
    credentials: true,
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
