const { Router } = require("express");
const { body } = require("express-validator");
const waitlist = require("../controllers/waitlistController.js");

const router = Router();

// waitlist route
router.post(
  "/waitlist",
  body("email").trim().isEmail().escape(), // Validate req.body data
  waitlist.saveEmail
);

module.exports = router;
