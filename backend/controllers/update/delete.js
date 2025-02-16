const Updates = require("../../models/Updates");
const AsyncHandler = require("express-async-handler");
const sendNotification = require("../../utils/sendNotification");
const getAllNotificationsIDs = require("../../utils/getAllNotificationsIDs");

const Courses = require("../../models/Courses");

const deleteClassUpdate = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const update = await Updates.findByIdAndDelete(id);
    if (!update) {
      return res.status(404).json({ message: "Class update not found" });
    }

    const notificationIDs = await getAllNotificationsIDs();

    let courseCode = update.course;
    courseCode = (await Courses.findById(courseCode)).code;

    try {
      await sendNotification(
        notificationIDs,
        `${update.type || "Class"} Cancelled: ${courseCode} is cancelled`
      );
    } catch (error) {
      console.log(error);
    }
    res
      .status(200)
      .json({ message: "Class update deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting class update", success: false });
  }
});

module.exports = deleteClassUpdate;
