import Note from "../models/note.model.js";

const createNote = async (data) => {
  const { userId, title, content, color, attachment, category, tags } = data;

  const newNote = await Note.create({
    user: userId,
    title,
    content,
    color,
    attachment,
    category,
    tags
  });

  return newNote;
};

const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

const updateNote = async (data) => {
  let query = {};

  if (data.title) query.title = data.title;
  if (data.content) query.content = data.content;
  if (data.color) query.color = data.color;
  if (data.attachment) query.attachment = data.attachment;
  if (data.category) query.category = data.category;
  if (data.tags && data.tags.length !== 0) query.tags = data.tags;
  if (data.isDeleted !== undefined) query.isDeleted = data.isDeleted;
  if (data.isPinned !== undefined) query.isPinned = data.isPinned;
  if (data.isArchived !== undefined) query.isArchived = data.isArchived;

  if (Object.keys(query).length === 0) {
    throw new Error("No fields to update");
  }

  query.lastModifiedBy = data.userId;

  const existedNote = await Note.findById(data.id);
  if (!existedNote) {
    throw new Error("Note not found");
  }

  if (data.isPinned !== undefined) {
    const pinnedNotes = await Note.find({
      user: data.userId,
      isPinned: true
    });
    if (pinnedNotes.length >= 5) {
      throw new Error("You can only pin up to 5 notes.");
    }
  }

  const result = await Note.updateOne({ _id: data.id }, { $set: query });

  if (result.modifiedCount === 0) {
    throw new Error("Note not found or nothing was updated.");
  }

  const updatedNote = await Note.findOne({ _id: data.id });

  return updatedNote;
};

const getAllNote = async (filters) => {
  const limit = parseInt(filters.limit) || 10;
  const page = parseInt(filters.page) || 1;
  const skip = (page - 1) * limit;
  const sort = filters.sort || "createdAt";
  const sortOrder = filters.sortOrder === "desc" ? -1 : 1;
  const sortBy = {};
  sortBy[sort] = sortOrder;

  let query = {
    user: filters.userId,
    isDeleted: false,
    isArchived: false
  };

  // Apply filters dynamically
  if (filters.isCompleted !== undefined)
    query.isCompleted =
      filters.isCompleted === "true" || filters.isCompleted === true;

  if (filters.isDeleted !== undefined)
    query.isDeleted =
      filters.isDeleted === "true" || filters.isDeleted === true;

  if (filters.status) query.status = filters.status;

  if (filters.reminderAt)
    query.reminderAt = { $gte: new Date(filters.reminderAt) };

  // Text Search (if search term is provided)
  let todos;
  let totalCount;

  if (filters.search) {
    const aggregateQuery = [
      {
        $search: {
          index: "todo_search",
          text: {
            query: filters.search,
            path: ["todoName", "todoDescription"]
          }
        }
      },
      { $match: query },
      { $sort: sortBy },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }]
        }
      }
    ];

    const result = await Note.aggregate(aggregateQuery);
    todos = result[0].data;
    totalCount =
      result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;
  } else {
    totalCount = await Note.countDocuments(query);
    todos = await Note.find(query).sort(sortBy).skip(skip).limit(limit);
  }

  return {
    data: todos,
    limit: limit,
    totalCount: totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit)
  };
};

const getNoteById = async (filters) => {
 const note = await Note.aggregate([
    {
      $match: {
        _id: filters.noteId,
        user: filters.userId,
        isDeleted: false
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    }
  ]);

  return note
};

export default { createNote, deleteNote, updateNote, getAllNote, getNoteById };
