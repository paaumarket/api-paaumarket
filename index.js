import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import Terminal from "terminal-kit";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoute.js";

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

// Start Express Server
app.listen(process.env.PORT, () => {
  term.bold.green(`Server running on port ${process.env.PORT}\n`);
});
