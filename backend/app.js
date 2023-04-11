const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
// Load schemas & resolver
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const AuthorController = require("./controllers/AuthorController");
const BookController = require("./controllers/BookController");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@graphql.difiedf.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
connectDB();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    mongoDataMethods: { ...BookController, ...AuthorController },
  }),
});
const app = express();
async function startApollo() {
  await server.start();
  server.applyMiddleware({ app });
}
startApollo();
app.listen({ port: 4000 }, () => {
  console.log("Server run on http://localhost:4000/graphql");
});
