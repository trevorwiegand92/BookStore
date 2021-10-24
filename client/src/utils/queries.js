import gql from 'graphql-tag';


export const GET_ME = gql`
{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        reviewText
        createdAt
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
query {
  reviews{
    _id
    reviewText
    reviewAuthor
    book
  }
}
`;

// export const QUERY_SINGLE_REVIEW = gql`
//   query getSingleThought($thoughtId: ID!) {
//     thought(thoughtId: $thoughtId) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        reviewText
        reviewAuthor
        createdAt
      }
    }
  }
`;
