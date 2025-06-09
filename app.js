const express = require("express");
const morgan = require("morgan");
const app = express();
const userModel = require("./models/user");
const dbConnection = require("./config/db");
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.post("/form-data", (req, res) => {
  console.log(req.body);
  res.send("data received");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const {
    username,
    email,
    dob,
    gender,
    address,
    School,
    city,
    state,
    pincode,
    Course,
  } = req.body;
  await userModel.create({
    username: username,
    email: email,
    dob: dob,
    gender: gender,
    address: address,
    School: School,
    city: city,
    state: state,
    pincode: pincode,
    Course: Course,
  });
  res.redirect("/users");
});

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("users", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.get("/users/edit/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("edit-user", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user");
  }
});

app.post("/users/edit/:id", async (req, res) => {
  try {
    const {
      username,
      email,
      dob,
      gender,
      address,
      school,
      city,
      state,
      pincode,
      Course,
    } = req.body;

    await userModel.findByIdAndUpdate(req.params.id, {
      username,
      email,
      dob,
      gender,
      address,
      school,
      city,
      state,
      pincode,
      Course,
    });
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

app.post("/users/delete/:id", async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(3000);
