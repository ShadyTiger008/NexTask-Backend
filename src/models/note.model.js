import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#ffffff"
    },
    attachment: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: null
    },
    tags: {
      type: [String],
      default: []
    },
    collaborators: [
      {
        user: {
          type: mongoose.Types.ObjectId, // Collaboration request can be send to the user via email and also user will get a notification
          ref: "User"
        },
        permission: {
          type: String,
          enum: ["view", "edit"],
          default: "view"
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
