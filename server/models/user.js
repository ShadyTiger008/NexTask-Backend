const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    userName: {
        type: String,
        required: true,
        min: 2,
        max: 10,
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    occupation: String,
    picturePath: String,
    todos: [
        {
            todoName: {
                type: String,
                required: true,
            },
            todoDescription: String,
            isCompleted: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema, "User");