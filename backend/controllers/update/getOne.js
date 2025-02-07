const Updates = require("../../models/Updates");
const AsyncHandler = require("express-async-handler");

const getUpdate = AsyncHandler(async (req, res) => {
  const updateId = req.params.id;
  console.log(updateId);

  // Fetch the update and populate the course details
  const update = await Updates.findById(updateId)
    .populate("course")
    .populate("postedBy");

  if (!update) {
    return res.status(404).json({ message: "Update not found" });
  }

  return res.status(200).json(update);
});

module.exports = getUpdate;
