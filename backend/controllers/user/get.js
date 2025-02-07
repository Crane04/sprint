const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");

const getUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  return res.json(user);
});

module.exports = getUser;
