import { Comment } from '../../types/types';
import { getReviewDate } from '../../utils/utils';
import Rating from '../rating/rating';


export default function Review({review} : {review: Comment}): JSX.Element {

  const {rating, comment, userName, createAt, advantage, disadvantage} = review;

  const date = getReviewDate (createAt);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{date}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <Rating height="16" width="16" rating={rating} />

        <span className="rate__count"></span>
        <span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}
