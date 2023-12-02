const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function protect(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    const decodedToekn = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToekn.userId);

    if (!user) {
      throw new Error("Invalid Token");
    }

    req.user = { userId: user._id };

    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
}

module.exports = { protect };
