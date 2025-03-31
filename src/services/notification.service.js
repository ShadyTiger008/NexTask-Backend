import cron from "node-cron";
import Todo from "../models/todo.model.js";
import Notification from "../models/notification.model.js";
import sendEmail from "../utils/mailer.util.js";
import sendPushNotification from "../utils/push-notification.util.js";

const scheduleNotification = async () => {
  cron.schedule("* * * * *", async () => {
    console.log("------------------ Scheduler is running ------------------");

    const nowIST = new Date(); // Current IST time
    console.log("Current Time (IST):", nowIST.toISOString());

    // Convert to UTC for DB query (MongoDB stores timestamps in UTC)
    const nowUTC = new Date(nowIST.getTime() - 5.5 * 60 * 60 * 1000);
    const startRange = new Date(nowUTC.getTime() - 30000); // 30 sec before
    const endRange = new Date(nowUTC.getTime() + 30000); // 30 sec after

    console.log(
      `Querying tasks between ${startRange.toISOString()} and ${endRange.toISOString()}`
    );

    const todos = await Todo.find({
      reminderAt: { $gte: startRange, $lte: endRange }, // Match exact time range
      isCompleted: false,
      isDeleted: false
    }).populate("userId", "email pushSubscription");

    if (todos.length === 0) {
      console.log("No tasks found for this time slot.");
      return;
    }

    for (const todo of todos) {
      console.log(`Sending reminder for: ${todo.todoName}`);

      // Send email reminder
      await sendEmail(
        todo.userId.email,
        "Reminder: " + todo.todoName,
        `Don't forget: ${todo.todoDescription}`
      );

      // Send push notification
      if (todo.userId.pushSubscription) {
        await sendPushNotification(todo.userId.pushSubscription, {
          title: "Reminder",
          body: todo.todoName
        });
      }

      // Store the notification in DB
      await Notification.create({
        userId: todo.userId._id,
        type: "reminder",
        message: `Reminder for: ${todo.todoName}`,
        status: "Sent",
        sendAt: nowUTC
      });

      console.log(`Reminder sent successfully for: ${todo.todoName}`);
    }
  });
};

export { scheduleNotification };
