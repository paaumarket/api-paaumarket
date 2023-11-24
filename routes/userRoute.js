import * as user from "../controllers/userController.js";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

// register user route
router.post(
  "/register",
  //   Validating req.body data
  body("email").trim().isEmail().escape(),
  body("password").isLength({ min: 8 }).escape(),
  body("username").escape(),
  user.createUser
);

// login user route
router.post("/login", user.loginUser);

// update user route
router.put("/:id", user.updateUser);

export default router;
