import cron from "node-cron";
import Todo from "../models/todo.model.js";
import Notification from "../models/notification.model.js";
import sendEmail from "../utils/mailer.util.js";
import sendPushNotification from "../utils/push-notification.util.js";

const scheduleNotification = async () => {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    console.log("------------------ Scheduler is running ------------------");

    const now = new Date();
    console.log("Current Time:", now.toISOString());

    // Create a 1-minute window (30 seconds before and after current time)
    const startRange = new Date(now.getTime() - 30000); // 30 sec before
    const endRange = new Date(now.getTime() + 30000); // 30 sec after

    console.log(
      `Querying tasks between ${startRange.toISOString()} and ${endRange.toISOString()}`
    );

    // Query todos with reminderAt within the time window
    const todos = await Todo.find({
      reminderAt: { $gte: startRange, $lte: endRange },
      isCompleted: false,
      isDeleted: false
    }).populate("userId", "email pushSubscription");

    if (todos.length === 0) {
      console.log("No tasks found for this time slot.");
      return;
    }

    for (const todo of todos) {
      console.log(`Sending reminder for: ${todo.todoName}`);

      try {
        // Send email reminder
        await sendEmail(
          todo.userId.email,
          "Reminder: " + todo.todoName,
          `Don't forget: ${todo.todoDescription}`
        );

        // Send push notification if subscription exists
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
          sendAt: now
        });

        console.log(`Reminder sent successfully for: ${todo.todoName}`);
      } catch (error) {
        console.error(`Failed to send reminder for ${todo.todoName}:`, error);
      }
    }
  });
};

export { scheduleNotification };