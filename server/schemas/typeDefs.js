// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    _id: ID!
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    review: String
  }
type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
input savedBook {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
}
type Review {
  _id: ID
  reviewText: String
  reviewAuthor: String
  book: String
}

type Comment {
  _id: ID
  commentText: String
  commentAuthor: String
  createdAt: String
}

type Query {
  reviews: [Review]
  books: [Book]
  review(reviewId: ID!): Review
  me: User  
  }
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    removeBook(bookId: ID!): User
    addReview(reviewText: String!, reviewAuthor: String!, book: String): Review
    removeReview(reviewId: ID!): Review
}
type Auth {
    token: ID!
    user: User
  }
`;



// export the typeDefs
module.exports = typeDefs;