const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    firstname: {
      type: String,
      require: true,
    },
    otherName: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dvfeybrvk/image/upload/v1682258754/download_pdurif.png",
    },
    whois: {
      type: String,
      require: true,
    },
    mobilePhoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    next_payment_date: {
      type: String,
      type: Date,
    },
    products: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
