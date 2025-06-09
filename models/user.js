const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  dob: Date,
  gender: String,
  address: String,
  School: String,
  city: String,
  state: String,
  pincode: Number,
  Course: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
