const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");
const { cloudinary } = require("../config/cloudinary.js");
const { validationResult } = require("express-validator");

async function createUser(req, res) {
  try {
    const validateErrors = validationResult(req).errors;

    validateErrors.forEach((error) => {
      if (error.path == "email") {
        throw new Error("Invalid email address.");
      }
    });

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("This field are required");
    }

    const existingUserEmail = await User.findOne({ email });
    const existingUserUsername = await User.findOne({ username });

    if (existingUserEmail) {
      throw new Error("User already exist with this email address");
    }

    if (existingUserUsername) {
      throw new Error("User already exist with this username");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = User({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    res
      .status(200)
      .send({ message: "Account created successfully!", user: savedUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("This field are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password don't match!");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).send({ token, id: user._id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (userId.toString() !== id) {
      throw new Error("You can only update your account");
    }

    let profileUrl = "";

    if (req.file) {
      // check if the profile picture was provided
      const image = await cloudinary.uploader.upload(req.file.path);

      profileUrl = image.secure_url;
    }

    const { profilePic, ...others } = req.body;

    const updateFields = { ...others };
    if (profilePic) {
      // add the profile image to the update file
      updateFields.porfilePicture = profilePic;
    }

    // Update the data in the databse
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res
      .status(200)
      .send({ message: "Updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateUserPassword(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const { currentPassword, newPassword } = req.body;

    if (userId.toString() !== id) {
      throw new Error("You can only update your account");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await compare(currentPassword, user.password);

    if (!isMatch) {
      throw new Error("Password don't match");
    }

    const hashedPassword = await hash(newPassword, 10);

    user.password = hashedPassword;

    user.save();
    res.status(200).send({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getUser(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // removing sensitive credentials
    const { password, ...otherData } = user.toObject();

    res.status(200).send({ user: otherData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
module.exports = {
  createUser,
  loginUser,
  updateUser,
  updateUserPassword,
  getUser,
};
