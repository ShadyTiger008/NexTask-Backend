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
    }).populate("user", "email pushSubscription");

    if (todos.length === 0) {
      console.log("No tasks found for this time slot.");
      return;
    }

    for (const todo of todos) {
      console.log(`Sending reminder for: ${todo.todoName}`);

      try {
        // Send email reminder
        await sendEmail(
          todo.user.email,
          "Reminder: " + todo.todoName,
          `Don't forget: ${todo.todoDescription}`
        );

        // Send push notification if subscription exists
        if (todo.user.pushSubscription) {
          await sendPushNotification(todo.user.pushSubscription, {
            title: "Reminder",
            body: todo.todoName
          });
        }

        // Store the notification in DB
        await Notification.create({
          user: todo.user._id,
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

const getAllNotifications = async (filters) => {
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;

  // Get the sort field or default to createdAt
  const sort = filters.sort || "createdAt";
  const sortOrder = filters.sortOrder === "desc" ? -1 : 1;
  const sortBy = {};
  sortBy[sort] = sortOrder;

  // Base query
  let query = {
    isDeleted: false
  };

  // Filter by userId if provided
  if (filters.userId) {
    query.userId = filters.userId;
  }

  // Get paginated notifications with proper sorting
  const result = await Notification.find(query)
    .populate("user", "email")
    .sort(sortBy)
    .limit(limit)
    .skip(skip);

  // Get total count for pagination
  const totalCount = await Notification.countDocuments(query);

  return {
    data: result,
    limit: limit,
    totalCount: totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit)
  };
};

export default { scheduleNotification, getAllNotifications };
