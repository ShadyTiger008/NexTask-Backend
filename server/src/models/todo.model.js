const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    todoName: {
      type: String,
      required: true,
    },
    todoDescription: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    status: {
        type: String,
        enum: ['Pending', 'In-progress', 'Closed']
    },
    reminderAt: {
      type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false // will be automatically deleted after a certain time till then user can undo and retrieve their deleted todo
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);