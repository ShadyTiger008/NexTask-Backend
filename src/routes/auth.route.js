// Imports
const express = require("express");
// End Imports

// Controllers
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
// End Controllers

// Middlewares
const authMiddleware = require("../middleware/auth.middleware");
// End Middlewares

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/getUser", authMiddleware.verifyJwt(), userController.getUser);

module.exports = router;
