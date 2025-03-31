const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const response = await authService.loginUser(req.body);

    return res.status(200).json({
      message: "User log in successful",
      ...response,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { register, login };
