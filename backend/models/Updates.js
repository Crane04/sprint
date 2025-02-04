const mongoose = require("mongoose");

const UpdatesSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  lecturer: {
    type: String,
    required: true,
  },
  startsBy: {
    type: Date,
    required: true,
  },
  endsBy: {
    type: Date,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ["class", "test"],
    required: true,
  },
});

const Updates = mongoose.model("Updates", UpdatesSchema);

module.exports = Updates;
