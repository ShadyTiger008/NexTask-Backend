import notificationService from "../services/notification.service.js";

const getNotifications = async (req, res) => {
  try {
    const data = await notificationService.getAllNotifications(req.query);

    res.status(200).json({
      message: "Successfully retrieved all todo lists!",
      document: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export default { getNotifications };
