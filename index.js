const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/', userRoutes);
app.use('/todo', todoRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Succesfully connected to MongoDB!");
}).catch((error) => {
    console.log(error.message);
})

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
})