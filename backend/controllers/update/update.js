const Updates = require("../../models/Updates");
const AsyncHandler = require("express-async-handler");
const Courses = require("../../models/Courses");
const sendNotification = require("../../utils/sendNotification");
const getAllNotificationsIDs = require("../../utils/getAllNotificationsIDs");
const moment = require("moment");

const updateClassTimes = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let { startsBy, endsBy, venue } = req.body;
    console.log(startsBy, endsBy);

    // Convert to moment objects and add 1 hour
    const newStartsBy = moment(startsBy).add(1, "hour").toISOString();
    const newEndsBy = moment(endsBy).add(1, "hour").toISOString();

    // Validate date range
    if (!startsBy || !endsBy || newStartsBy >= newEndsBy) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Find the class update
    const update = await Updates.findById(id);
    if (!update) {
      return res.status(404).json({ message: "Class update not found" });
    }

    // Update times
    update.startsBy = newStartsBy;
    update.endsBy = newEndsBy;
    if (venue) {
      update.venue = venue;
    }
    await update.save();

    const notificationIDs = await getAllNotificationsIDs();
    const formattedTime = moment(startsBy).format("h:mm A");

    let courseCode = update.course;
    courseCode = (await Courses.findById(courseCode)).code;

    try {
      await sendNotification(
        notificationIDs,
        `${update.type || "Class"} Rescheduled: ${courseCode} is happening at ${formattedTime} at ${update.venue}`
      );
    } catch (error) {
      console.log(error);
    }

    res.status(200).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating class times" });
  }
});

module.exports = updateClassTimes;
