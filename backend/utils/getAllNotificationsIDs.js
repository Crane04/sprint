const UserModel = require("../models/User"); // Import your User model

const getAllNotificationIDs = async () => {
  try {
    // Fetch all users and select only the notificationID field
    const users = await UserModel.find({}, { notificationID: 1, _id: 0 });

    // Extract notification IDs and filter out empty or invalid values
    const notificationIDs = users
      .map((user) => user.notificationID)
      .filter((id) => id && id.trim() !== "");

    return notificationIDs;
  } catch (error) {
    console.error("Error fetching notification IDs:", error);
    throw error;
  }
};

module.exports = getAllNotificationIDs