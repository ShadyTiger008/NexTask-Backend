// Imports
import express from "express";
// End Imports

// Controllers
import noteController from "../controllers/note.controller.js";
// End Controllers

// Middlewares
import { verifyJwt } from "../middleware/auth.middleware.js";
// End Middlewares

const router = express.Router();

router.get("/get-all", verifyJwt, noteController.getNotes);

router.post("/add", verifyJwt, noteController.addNote);

router.put("/update", verifyJwt, noteController.modifyNote);

router.delete("/delete/:noteId", verifyJwt, noteController.dropNote);

router.get("/get/:noteId", verifyJwt, noteController.getNoteById);

export default router;
