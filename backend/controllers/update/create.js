const Updates = require("../../models/Updates");
const AsyncHandler = require("express-async-handler");
const Courses = require("../../models/Courses");

const createUpdate = AsyncHandler(async (req, res) => {
  try {
    const { courseCode, lecturer, startsBy, endsBy, type } = req.body;

    // Validate dates
    if (startsBy >= endsBy) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const course = await Courses.findOne({ code: courseCode });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const update = await Updates.create({
      course: course?.id,
      lecturer,
      startsBy,
      endsBy,
      postedBy: req.user._id, // Assuming req.user is set
      type,
    });

    res.status(201).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating update" });
  }
});

module.exports = createUpdate;
