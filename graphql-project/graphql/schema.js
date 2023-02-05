//Graphql-tag
import { gql } from "graphql-tag";

//graphql
import { typeDefs as Author, resolvers as AuthorResolvers } from "./author.js";
import { typeDefs as Book, resolvers as BookResolvers } from "./book.js";

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export const resolvers = [BookResolvers, AuthorResolvers];
export const typeDefs = [rootTypeDefs, Author, Book];
