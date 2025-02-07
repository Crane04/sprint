const Updates = require("../../models/Updates");
const User = require("../../models/User");
const AsyncHandler = require("express-async-handler");
const moment = require("moment");

const getAllUpdates = AsyncHandler(async (req, res) => {
  // Get the current user
  const user = await User.findById(req.user._id);
  const { type } = req.query;
  console.log(type);

  const currentTime = moment().toISOString();

  const updates = await Updates.find({
    course: { $in: user.registeredCourses },
    endsBy: { $gt: currentTime },
    type,
  })
    .populate("course")
    .sort({ startsBy: -1 }) // Latest first
    .exec();

  // Return the updates along with the course details
  return res.status(200).json(updates);
});

module.exports = getAllUpdates;
