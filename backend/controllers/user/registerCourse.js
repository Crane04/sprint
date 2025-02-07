const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const Courses = require("../../models/Courses");
    
const registerCourses = AsyncHandler(async (req, res) => {
  try {
    const { courseCodes } = req.body;
    console.log(courseCodes)

    if (!Array.isArray(courseCodes) || courseCodes.length === 0) {
      return res.status(400).json({ message: "Invalid course codes array" });
    }

    const courses = await Courses.find({ code: { $in: courseCodes } });
    if (courses.length !== courseCodes.length) {
      return res.status(404).json({ message: "One or more courses not found" });
    }

    const user = await User.findById(req.user._id);
    user.registeredCourses.addToSet(...courses.map(course => course._id));
    await user.save();

    res.status(200).json({ message: "Courses added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding courses" });
  }
});

module.exports = registerCourses;