//graphql
import { GraphQLObjectType, GraphQLSchema } from "graphql";

//queries
import { user, users, posts, post, comments, comment } from "./queries.js";

//mutations
import {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
} from "./mutations.js";

const QueryType = new GraphQLObjectType({
  name: "QueryTypes",
  description: "The root query type",
  fields: {
    users,
    user,
    posts,
    post,
    comments,
    comment,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default schema;
