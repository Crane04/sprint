const Updates = require("../../models/Updates");
const AsyncHandler = require("express-async-handler");
const Courses = require("../../models/Courses");
const sendNotification = require("../../utils/sendNotification");
const getAllNotificationsIDs = require("../../utils/getAllNotificationsIDs");
const moment = require("moment");

const createUpdate = AsyncHandler(async (req, res) => {
  try {
    const { courseCode, lecturer, startsBy, endsBy, type, venue } = req.body;
    console.log(venue);
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
      venue,
    });
    const notificationIDs = await getAllNotificationsIDs();
    const formattedTime = moment(startsBy).format("h:mm A");
    try {
      await sendNotification(
        notificationIDs,
        `${courseCode} ${type} is happening at ${formattedTime} at ${venue}`
      );
    } catch (error) {}
    res.status(201).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating update" });
  }
});

module.exports = createUpdate;
