//Apollo-server
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//graphql
import { typeDefs, resolvers } from "./graphql/schema.js";

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.info(`Server is running on ${url}`);
};

startApolloServer(typeDefs, resolvers);
