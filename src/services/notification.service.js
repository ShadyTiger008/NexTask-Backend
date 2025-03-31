const Notification = require("../../models/notification.model");

const createNotification = async (data) => {
  const { userId, type, message, sendAt } = data;

  const newNotification = await Notification.create({
    userId,
    type,
    message,
    sendAt
  });

  return newNotification;
};

const deleteNotification = async (id) => {
  return await Notification.deleteOne({ _id: id });
};

const updateNotification = async (data) => {
  let query = {};

  if (data.type) query.type = data.type;
  if (data.message) query.message = data.message;

  return await Notification.updateOne({ _id: data.id }, { $set: query });
};

const getNotification = async (data) => {
  const notifications = await Notification.find({
    userId: req.user.id
  }).sort({ createdAt: -1 });

  return notifications;
};

module.exports = {
  createNotification,
  deleteNotification,
  updateNotification,
  getNotification
};
