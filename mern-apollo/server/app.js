//Express
import express from "express";

//Apollo
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

//Cors
import cors from "cors";

//http
import http from "http";

//Apollo server
const startApolloServer = async (typeDefs, resolvers) => {
  //variables
  const app = express();
  const httpServer = http.createServer(app);

  //routes
  app.get("/", (req, res) => {
    res.send("Welcome to my API");
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.info("Server on port 4000");
};

export { startApolloServer };
