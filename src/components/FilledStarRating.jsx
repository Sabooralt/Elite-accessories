import React from 'react';
import { FilledStar } from './ReviewsCard';

const FilledStarRating = ({ rating, style }) => {
  const filledStars = [];
  const MAX_STARS = 5;

  for (let i = 0; i < Math.min(rating, MAX_STARS); i++) {
    filledStars.push(<FilledStar key={i} width={25} height={25} color="#ffc107" style={style} />);
  }

  return <>{filledStars}</>;
};

export default FilledStarRating;
