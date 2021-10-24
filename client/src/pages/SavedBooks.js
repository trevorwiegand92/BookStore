import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { ADD_REVIEW, REMOVE_BOOK } from '../utils/mutations';


const SavedBooks = () => {
  const [review, setReview] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const { loading, data} = useQuery(GET_ME);
  const [removeBook, {error}] = useMutation(REMOVE_BOOK);
  const [addReview, { err }] = useMutation(ADD_REVIEW);

  const userData = data?.me || [];

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteBook(bookId, token);
      const {data} = await removeBook({
        variables: { bookId }
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await addReview({
        variables: {reviewText: review, reviewAuthor:"", book:bookTitle},
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewBook = async (bookID) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(bookID);
    // if (!token) {
    //   return false;
    // }

    // try {
    //   const {data} = await addReview ({
    //     variables: {bookID}
    //   });
    
  }

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                  {/* <Button className='btn-block btn-light' onClick={() => handleReviewBook()}>
                    Review This Book!
                  </Button> */}
                </Card.Body>
              <form onSubmit={handleFormSubmit}>
                <textarea className='btn-block' onChange={(event) => {
                  setReview(event.target.value)
                  setBookTitle(book.title)
                  }}></textarea>
                <button className='btn-block btn-light' type="submit">Add Review!</button>
                </form>
                </Card>
              
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;