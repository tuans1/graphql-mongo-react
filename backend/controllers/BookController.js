const Book = require("../models/Book");

const BookController = {
  getAllBooks: async (condition = null) =>
    condition === null ? await Book.find() : await Book.find(condition),

  getBookById: async (id) => await Book.findById(id),

  createBook: async (args) => {
    const newBook = new Book(args);
    return await newBook.save();
  },
};

module.exports = BookController;
