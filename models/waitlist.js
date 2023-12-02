const mongoose = require("mongoose");

const waitlistSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;
