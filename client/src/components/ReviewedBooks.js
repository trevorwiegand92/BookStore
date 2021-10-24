import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Form, Button, Alert } from 'react-bootstrap';

import { ADD_REVIEW } from '../utils/mutations';
import { QUERY_REVIEWS, QUERY_ME } from '../utils/queries';

import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const ReviewedBooks = () => {
  const [reviewText, setReviewText] = useState('');
  const { loading, data} = useQuery(QUERY_REVIEWS);
  const reviewData = data?.reviews || [];

  const [characterCount, setCharacterCount] = useState(0);

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, review: [...me.reviews, addReview] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReview({
        variables: {
          reviewText,
          reviewAuthor: Auth.getProfile().data.username,
        },
      });

      setReviewText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'reviewText' && value.length <= 280) {
      setReviewText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your take on this book?</h3>

      

          {
            loading?"still loading...":reviewData.map(review => {
              return (
                <div>
                  <h5>{review.book}</h5>
                  <h5>{review.reviewText}</h5>
                  <h5>{review.reviewAuthor}</h5>
                </div>
              )
            })
          }



    </div>
  );
};

export default ReviewedBooks;