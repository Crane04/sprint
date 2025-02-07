const User = require("../../models/User");
const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const createUser = AsyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      matricNumber,
      email,
      department,
      level,
      password,
    } = req.body;

    const requiredFields = {
      firstName: "First Name is required.",
      matricNumber: "Matric Number is required.",
      email: "Email is required.",
      department: "Department is required.",
      level: "Level is required.",
      password: "Password is required.",
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !req.body[key])
      .map(([, message]) => message);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: missingFields });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const existingMatricNumber = await User.findOne({ matricNumber });
    if (existingMatricNumber) {
      return res.status(400).json({
        message:
          "Matric Number exists already, message the support if you didn't create the account",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      matricNumber,
      email,
      department,
      level,
      password: hashedPassword,
    });

    res.status(201).json({
      "message": "Your account has been created"
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || "Error creating user" });
  }
});

module.exports = createUser;
