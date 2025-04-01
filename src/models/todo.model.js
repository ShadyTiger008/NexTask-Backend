import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    todoName: {
      type: String,
      required: true
    },
    todoDescription: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["Pending", "In-progress", "Closed"],
      default: "Pending"
    },
    reminderAt: {
      type: Date
    },
    isDeleted: {
      type: Boolean,
      default: false // will be automatically deleted after a certain time till then user can undo and retrieve their deleted todo
    }
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
