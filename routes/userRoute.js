import * as user from "../controllers/userController.js";
import { Router } from "express";
import { body } from "express-validator";
import { protect } from "../middlewares/protect.js";

const router = Router();

// register user route
router.post(
  "/register",
  body("email").trim().isEmail().escape(), // Validate req.body data
  body("password").isLength({ min: 8 }).escape(),
  body("username").escape(),
  user.createUser
);

// login user route
router.post("/login", user.loginUser);

// update user route
router.put("/:id", protect, user.updateUser);

// update password route
router.put("/updatePassword/:id", protect, user.updateUserPassword);

// get a user route
router.get("/u/:userId", protect, user.getUser);

export default router;
