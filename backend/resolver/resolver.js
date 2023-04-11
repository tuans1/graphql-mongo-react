const { authors, books } = require("../data/static");
const AuthorSchema = require("../models/Author");
const BookSchema = require("../models/Book");
const resolvers = {
  // Query
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),

    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },
  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
  },
  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },
  // Mutation
  Mutation: {
    createAuthor: async (parent, args) => {
      const author = new AuthorSchema(args);
      return author.save();
    },
    createBook: (parent, args) => {
      const book = new BookSchema(args);
      return book.save();
    },
  },
};

module.exports = resolvers;
