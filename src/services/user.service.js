// Models
const User = require("../../models/user.model");
// End Models

const findUser = async (data) => {
  const { id } = data;

  const user = await User.findById(id);

  return user;
};

module.exports = { findUser };
