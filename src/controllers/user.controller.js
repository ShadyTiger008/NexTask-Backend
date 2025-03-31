const User = require('../models/user');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            message: "Successfully got the user information",
            User: user
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}
    
module.exports = {
  getUser,
};