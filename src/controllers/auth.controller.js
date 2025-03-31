import authService from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const response = await authService.loginUser(req.body);
    if (!response) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "User login successful", ...response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { register, login };
