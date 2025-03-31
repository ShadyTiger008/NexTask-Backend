// Models
import User from "../models/user.model.js";
// End Models

const findUser = async (data) => {
  const { id } = data;

  const user = await User.findById(id);

  return user;
};

export default { findUser };
