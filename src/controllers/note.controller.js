import noteService from "../services/note.service.js";

const addNote = async (req, res) => {
  try {
    const todo = await noteService.createNote({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      message: "Note created successfully!",
      todo
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const data = {
      userId: req.user.id,
      ...req.query
    };
    const todos = await noteService.getAllNote(data);

    res.status(200).json({
      message: "Successfully retrieved all todo lists!",
      document: todos
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const dropNote = async (req, res) => {
  try {
    if (!req.params.noteId) {
      return res.status(400).json({
        message: "Note ID is required!"
      });
    }

    const deleted = await noteService.deleteNote(req.params.noteId);
    if (!deleted) {
      return res.status(404).json({
        message: "Note not found!"
      });
    }

    res.status(200).json({
      message: "Note deleted successfully!",
      deleted
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const modifyNote = async (req, res) => {
  try {
    const updatedNote = await noteService.updateNote({
      ...req.body,
      userId: req.user.id
    });

    res.status(200).json({
      message: "Note updated successfully!",
      updatedNote
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const data = {
      userId: req.user.id,
      noteId: req.params.noteId
    };
    const todos = await noteService.getAllNote(data);

    res.status(200).json({
      message: "Successfully retrieved all todo lists!",
      document: todos
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export default {
  addNote,
  getNotes,
  dropNote,
  modifyNote,
  getNoteById
};
