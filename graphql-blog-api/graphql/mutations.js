//graphql
import { GraphQLID, GraphQLString } from "graphql";

//models
import {
  userSchema as User,
  postSchema as Post,
  commentSchema as Comment,
} from "../models/index.js";

//jwt
import { createJWTToken } from "../util/auth.js";

//types
import { CommentType, PostType } from "../graphql/types.js";

export const register = {
  type: GraphQLString,
  description: "Register a new user and returns a token",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(_, args) {
    //variables
    const { username, email, password, displayName } = args;

    //create and save
    const user = new User({ username, email, password, displayName });
    await user.save();

    //generate token
    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    return token;
  },
};

export const login = {
  type: GraphQLString,
  description: "Login a user and returns a token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    //validate that the user exists and that the password is correct.
    const user = await User.findOne({ email: args.email }).select("+password");
    if (!user || args.password !== user.password)
      throw new Error("Invalid Credentials");

    //generate token
    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    return token;
  },
};

export const createPost = {
  type: PostType,
  description: "Create a new post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_, args, { verifiedUser }) {
    //create and save
    const post = new Post({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id,
    });
    await post.save();

    return post;
  },
};

export const updatePost = {
  type: PostType,
  description: "Update a post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_, { id, title, body }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, body },
      { new: true, runValidators: true }
    );
    if (!updatedPost) throw new Error("Post not found");
    return updatedPost;
  },
};

export const deletePost = {
  type: GraphQLString,
  description: "Delete a post",
  args: {
    postId: { type: GraphQLID },
  },
  async resolve(_, { postId }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");
    const postDeleted = await Post.findOneAndDelete({
      _id: postId,
      authorId: verifiedUser._id,
    });
    if (!postDeleted) throw new Error("Post not found");
    return "Post deleted";
  },
};

export const addComment = {
  type: CommentType,
  description: "Add a comment to a post",
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLID },
  },
  async resolve(_, { comment, postId }, { verifiedUser }) {
    //create and save
    const newComment = new Comment({
      comment,
      postId,
      userId: verifiedUser._id,
    });
    await newComment.save();

    return newComment;
  },
};

export const updateComment = {
  type: CommentType,
  description: "Update a comment",
  args: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  },
  async resolve(_, { id, comment }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");
    const commentUpdated = await Comment.findOneAndUpdate(
      { _id: id, userId: verifiedUser._id },
      { comment },
      { new: true, runValidators: true }
    );
    if (!commentUpdated) throw new Error("Comment not found");
    return commentUpdated;
  },
};

export const deleteComment = {
  type: GraphQLString,
  description: "Delete a comment",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, { id }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");
    const commentDeleted = await Comment.findOneAndDelete({
      _id: id,
      userId: verifiedUser._id,
    });
    if (!commentDeleted) throw new Error("Comment not found");
    return "Comment deleted";
  },
};
