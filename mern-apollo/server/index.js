//Apolo server
import { startApolloServer } from "./app.js";

//typeDefs
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

//db
import { connectDB } from "./db.js";

//db
connectDB();

//server
startApolloServer(typeDefs, resolvers);
