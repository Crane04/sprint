const { Expo } = require("expo-server-sdk");

const sendPushNotification = async (pushTokens = ["ExponentPushToken[L29QB0LiPUoIqRu4HEuyiT]"], message ) => {
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

  // Array to hold messages
  let messages = [];

  for (let pushToken of pushTokens) {
    // Check if the push token is valid
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct the message
    messages.push({
      to: pushToken,
      sound: "default",
      title: "Notis:",
      body: message,
      data: { withSome: "data" }, // You can customize the data here
    });
  }

  // Chunk messages for sending in batches
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  try {
    // Send each chunk
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
    console.log("Push notifications sent:", tickets);
    return tickets
  } catch (error) {
    console.error("Error sending push notifications:", error);
  }
};

module.exports = sendPushNotification;
