const Updates = require("../../models/Updates");
const User = require("../../models/User");
const AsyncHandler = require("express-async-handler");

const getAllUpdates = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const updates = await Updates.find({
    course: { $in: user.registeredCourses },
  });

  return res.status(200).json(updates);
});

module.exports = getAllUpdates;
