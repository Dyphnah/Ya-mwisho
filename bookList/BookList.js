// This will go to about book or any other component that fetches data

import React, { useEffect, useState } from 'react';
import './bookList.css';
import ReviewForm from '../reviewForm/ReviewForm';

const BookList = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      title: title,
      content: content,
      rating: rating
    };

    // Perform POST request to save the review to the backend
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Review submitted:', data);
        // Append the new review to the reviews array
        setReviews([...reviews, data]);
        // Reset the form
        setTitle('');
        setContent('');
        setRating(0);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    // Fetch existing reviews from the backend
    fetch('/api/reviews')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched reviews:', data);
        setReviews(data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  return (
    <div>
      <ReviewForm
        handleContentChange={handleContentChange}
        handleSubmit={handleSubmit}
        handleTitleChange={handleTitleChange}
        handleRatingChange={handleRatingChange}
      />

      {/* Render the submitted reviews */}
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <h3>{review.title}</h3>
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
