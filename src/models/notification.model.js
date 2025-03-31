import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["in-app", "push", "email", "reminder"],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Sent", "Read"],
      default: "Pending"
    },
    sendAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
