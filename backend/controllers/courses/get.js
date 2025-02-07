const Courses = require("../../models/Courses");
const User = require("../../models/User"); // assuming you have a User model
const AsyncHandler = require("express-async-handler");

const getCourses = AsyncHandler(async (req, res) => {
  const userId = req.user._id; // assuming the user's ID is in the request user object
  const user = await User.findById(userId).populate("registeredCourses");
  const registeredCourses = user.registeredCourses;


  return res.json(registeredCourses);
});

module.exports = getCourses;
