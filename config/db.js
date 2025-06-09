const mongoose = require("mongoose");

const connection = mongoose
  .connect("mongodb://0.0.0.0/project_2nd")
  .then(() => {
    console.log("connected to data base");
  });

module.export = connection;
