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

  if (data.todoName) query.todoName = data.todoName;
  if (data.todoDescription) query.todoDescription = data.todoDescription;
  if (data.reminderAt) query.reminderAt = data.reminderAt;
  if (data.status) query.status = data.status;
  if (data.isDeleted !== undefined) query.isDeleted = data.isDeleted;
  if (data.isCompleted !== undefined) query.isCompleted = data.isCompleted;

  await Note.updateOne({ _id: data.id }, { $set: query });

  return await Note.findById(data.id);
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
    isDeleted: false
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

export default { createNote, deleteNote, updateNote, getAllNote };
