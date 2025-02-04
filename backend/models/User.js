const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
    },
    matricNumber: {
      type: String,
      required: [true, "Matric number is required"],
      unique: true,
    },
    email: {
      type: String,
      unique: [true, "User with this email already exists"],
      required: [true, "Email must be provided"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "{VALUE} is not a valid email!",
      },
    },
    department: {
      type: String,
      required: [true, "You must add a matric number"],
      enum: [
        "Mechanical Engineering",
        "Electrical and Electronics Engineering",
        "Civil Engineering",
        "Chemical and Polymer Engineering",
        "Industrial Engineering",
        "Aerospace Engineering",
      ],
    },
    level: {
      type: String,
      required: [true, "Enter your level"],
      enum: ["100", "200", "300", "400", "500"],
    },
    password: {
      type: String,
      required: true,
    },
    notificationID: {
      type: String,
      required: false,
      default: "",
    },
    studentType: {
      type: String,
      required: false,
      default: "normal",
      enum: ["normal", "hoc"],
    },
    registeredCourses: {
      type: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Courses", unique: true },
      ],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
