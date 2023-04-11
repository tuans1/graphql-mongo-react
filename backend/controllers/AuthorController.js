const Author = require("../models/Author");

const AuthorController = {
  getAllAuthors: async () => await Author.find(),

  getAuthorById: async (id) => await Author.findById(id),

  createAuthor: async (args) => {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  },
};

module.exports = AuthorController;
