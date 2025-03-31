import cron from "node-cron";
import Notification from "../models/Notification.js";
import { sendEmail } from "./mailer.js";

cron.schedule("* * * * *", async () => {
  // Runs every minute
  const now = new Date();
  const notifications = await Notification.find({
    sendAt: { $lte: now },
    status: "pending"
  });

  for (let n of notifications) {
    if (n.type === "email") {
      await sendEmail(n.userId.email, "Reminder", n.message);
    }
    n.status = "sent";
    await n.save();
  }
});
