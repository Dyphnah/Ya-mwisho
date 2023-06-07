import React from 'react';
import './reviewForm.css';

const ReviewForm = ({
  handleSubmit,
  handleTitleChange,
  handleContentChange,
  handleRatingChange,
  rating
}) => {
  const renderStars = () => {
    const stars = [];
    const labels = ['Poor', 'Fair', 'Average', 'Good', 'Excellent'];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? 'star filled' : 'star'}
          onClick={() => handleRatingChange(i)}
          title={labels[i - 1]}
        >
          &#9733;
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4>
          <span>Unleash Your Inner Critic:</span>
        </h4>
        <h1>
          <strong>Review the Enthralling Book You Just Read.</strong>
        </h1>
        <p>
          Express your opinions, share your reading experiences, and connect with fellow book enthusiasts. <br />
          Your review will help readers make informed decisions, discover new books, and engage in meaningful discussions about their favorite reads.
        </p>
        <div>
          <label>
            <span> <strong>Which book would you like to review?</strong></span>
          </label>
        </div>
        <br />
        <div>
          <input
            type="text"
            className="reviews-form"
            placeholder="Book title."
            onChange={handleTitleChange}
            required
          />
        </div>
        <br />
        <div>
          <textarea
            className="textarea"
            onChange={handleContentChange}
            placeholder="Write your review."
            required
          />
        </div>
        <br />
        <label className="stars">
          Rating: {renderStars()}
        </label>
        <br />
        <div>
          <button type="submit" className="submit-button">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
