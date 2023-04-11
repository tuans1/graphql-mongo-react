const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID #default type
    name: String
    genre: String
    author: Author
  }
  type Author {
    id: ID #default type
    name: String
    age: Int
    books: [Book]
  }
  #Root type
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }
  #Root type
  type Mutation {
    createAuthor(name: String, age: Int): Author
    createBook(name: String, genre: String, authorId: ID!): Book
  }
`;
module.exports = typeDefs;
