import webPush from "web-push";
import dotenv from "dotenv";

dotenv.config();

webPush.setVapidDetails(
  "mailto:chatterjeesoumyajeet@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendPushNotification = async (subscription, message) => {
  try {
    await webPush.sendNotification(subscription, JSON.stringify({ message }));
    console.log("Push notification sent successfully");
  } catch (error) {
    console.error("Push notification error:", error);
  }
};

export default sendPushNotification;

// npx web-push generate-vapid-keys
