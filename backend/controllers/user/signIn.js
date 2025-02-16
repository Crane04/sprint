const User = require("../../models/User");
const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signInUser = AsyncHandler(async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { matricNumber: identifier }],
    });

    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res
    //     .status(401)
    //     .json({ message: "Invalid identifier or password" });
    // }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        matricNumber: user.matricNumber,
      },
      process.env.SECRET_KEY
    );

    res.json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error signing in user" });
  }
});

module.exports = signInUser;
