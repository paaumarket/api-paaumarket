const user = require("../controllers/userController.js");
const { Router } = require("express");
const { body } = require("express-validator");
const { protect } = require("../middlewares/protect.js");

const router = Router();

// register user route
router.post(
  "/register",
  body("email").trim().isEmail().escape(), // Validate req.body data
  body("password").isLength({ min: 8 }).escape(),
  body("mobilePhoneNumber").escape(),
  body("whois").trim().escape(),
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

module.exports = router;
