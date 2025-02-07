const User = require("../../models/User");
const AsyncHandler = require("express-async-handler");

const updateNotID = AsyncHandler(async (req, res) => {
  console.log("updating");
  try {
    const id = req.user._id; // use _id instead of id
    const { notificationID } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.notificationID = notificationID;
    await user.save();

    res.status(200).json({ message: "Notification ID updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating notification ID" });
  }
});

module.exports = updateNotID;
