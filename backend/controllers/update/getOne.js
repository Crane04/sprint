const Updates = require("../../models/Updates");
const AsyncHandler = require("express-async-handler");

const getUpdate = AsyncHandler(async (req, res) => {
  const updateId = req.params.id;
  const update = await Updates.findById(updateId);

  if (!update) {
    return res.status(404).json({ message: "Update not found" });
  }

  return res.status(200).json(update);
});

module.exports = getUpdate;
