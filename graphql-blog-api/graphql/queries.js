//graphql
import { GraphQLID, GraphQLList } from "graphql";

//types
import { UserType, PostType, CommentType } from "./types.js";

//models
import {
  userSchema as User,
  postSchema as Post,
  commentSchema as Comment,
} from "../models/index.js";

export const users = {
  type: new GraphQLList(UserType),
  description: "Get all users",
  resolve() {
    return User.find();
  },
};

export const user = {
  type: UserType,
  description: "Get a user by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve(_, { id }) {
    return User.findById(id);
  },
};

export const posts = {
  type: new GraphQLList(PostType),
  description: "Get all posts",
  resolve() {
    return Post.find();
  },
};

export const post = {
  type: PostType,
  description: "Get a post by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve(_, { id }) {
    return Post.findById(id);
  },
};

export const comments = {
  type: new GraphQLList(CommentType),
  description: "Get all comments",
  resolve() {
    return Comment.find();
  },
};

export const comment = {
  type: CommentType,
  description: "Get a comment by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve(_, { id }) {
    return Comment.findById(id);
  },
};
