const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
   try {
    const {
      fullName,
      userName,
      email,
      password,
      picturePath,
      occupation,
      todos: [],
    } = req.body;

     if (!password) {
       return res.status(400).json({ error: "Password is required." });
     }
       
     const salt = await bcrypt.genSalt();
     const passwordHash = await bcrypt.hash(password, salt);

     const newUser = new User({
      fullName,
      userName,
      email,
      password: passwordHash,
      picturePath,
      occupation,
      todos: []
     });

     const savedUser = await newUser.save();
     res.status(201).json(savedUser);
   } catch (error) {
       console.error(error);
       res.status(500).json({
        message: 'Internal Server Error'
    });
   }
}

const login = async (req, res) => {
   try {
     const { email, password } = req.body;
     const user = await User.findOne({ email: email }).timeout(20000);
     
     if (!user) {
         return res.status(404).json({
             message: "User does not exist!"
         });
     }
    
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
         return res.status(404).json({
             message: "Password is incorrect!"
         });
     }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     delete user.password;
     return res.status(200).json({
         token,
         user
     });
   } catch (error) {
      return res.status(500).json({
      error: error.message
    });
  }
}

module.exports = { register, login };
