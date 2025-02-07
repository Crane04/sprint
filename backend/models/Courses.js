const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Courses = mongoose.model("Courses", courseSchema);

module.exports = Courses;

