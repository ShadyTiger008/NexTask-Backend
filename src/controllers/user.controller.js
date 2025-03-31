// Services
const userService = require("../services/user.service");
// End Services

const getUser = async (req, res) => {
  try {
    const user = await userService.findUser(req.params);

    res.status(200).json({
      message: "Successfully got the user information",
      user
    });
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
};

module.exports = {
  getUser
};
