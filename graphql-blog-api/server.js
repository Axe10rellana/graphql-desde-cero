//express
import express from "express";

//express-graphql
import { graphqlHTTP } from "express-graphql";

//schema
import schema from "./graphql/schema.js";

//db
import { connectDB } from "./db/index.js";

//middlewares
import { authenticate } from "./middlewares/auth.js";

//variables
connectDB();
const app = express();

//middlewares
app.use(authenticate);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to my graphql api");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

//server
app.listen(3000);
console.info("server is running on port 3000");
