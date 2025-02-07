const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const Courses = require("../../models/Courses");

const removeCourses = AsyncHandler(async (req, res) => {
  try {
    const { courseCodes } = req.body;

    if (!Array.isArray(courseCodes) || courseCodes.length === 0) {
      return res.status(400).json({ message: "Invalid course codes array" });
    }

    const coursesToRemove = await Courses.find({ code: { $in: courseCodes } });
    const courseIdsToRemove = coursesToRemove.map((course) => course._id);

    const user = await User.findById(req.user._id);
    user.registeredCourses.pull(...courseIdsToRemove);
    await user.save();

    res.status(200).json({ message: "Courses removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing courses" });
  }
});

module.exports = removeCourses;