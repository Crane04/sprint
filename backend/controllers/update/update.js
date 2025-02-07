const Updates = require("../../models/Updates");
const AsyncHandler = require("express-async-handler");
const moment = require("moment");

const updateClassTimes = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let { startsBy, endsBy } = req.body;
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
    await update.save();

    res.status(200).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating class times" });
  }
});

module.exports = updateClassTimes;
