//Graphql-tag
import { gql } from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    book(id: ID!): Book
    books: [Book]
  }

  extend type Mutation {
    createBook(title: String): String
  }

  type Book {
    id: ID!
    title: String
    author: Author
  }
`;

export const resolvers = {
  Query: {
    book: (_, id) => {
      return {
        id,
        title: "some book",
        author: {},
      };
    },
    books: () => [],
  },
  Mutation: {
    createBook: () => "Created Book",
  },
};
