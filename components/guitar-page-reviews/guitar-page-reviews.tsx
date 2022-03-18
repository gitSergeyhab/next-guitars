import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from "swr";


import Review from '../review/review';
import { getComments, getTheGuitar } from '../../store/guitar-reducer/guitar-reducer-selectors';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { ApiRoute, BASE_URL, DEFAULT_COMMENTS_COUNT, PopupType } from '../../const';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Comment, Guitar } from '../../types/types';


const fetcher = (url: string) => fetch(url).then((res) => res.json()).catch((e) => console.log(e))


function BtnMore({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="button button--medium reviews__more-button"
    >
    Показать еще отзывы
    </button>
  );
}

function BtnUp({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <a
      style={{zIndex: 1}}
      onClick={onClick}
      className="button button--up button--red-border button--big reviews__up-button" href="#header"
    >
      Наверх
    </a>
  );
}

type GuitarPageProductProps = {
  guitar : Guitar,
  comments: Comment[] | undefined,
}

export function GuitarPageReviews({comments, guitar} : GuitarPageProductProps): JSX.Element {

  const [ shownReviews, setShownReviews ] = useState(DEFAULT_COMMENTS_COUNT);

  const reviews = (comments || []).slice(0, shownReviews).map((comment) => <Review review={comment} key={comment.id} />);

  const handleBtnShowMoreClick = () => setShownReviews(Infinity);
  const handleBtnUpClick = () => setShownReviews(DEFAULT_COMMENTS_COUNT);

  const dispatch = useDispatch();
  const handleBtnPostReviewClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.Review));
  };



  return (

    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link href={'/'}>
        <a
          onClick={handleBtnPostReviewClick}
          className="button button--red-border button--big reviews__sumbit-button"
        >
          Оставить отзыв
        </a>

      </Link>


          {reviews}
          {(shownReviews === DEFAULT_COMMENTS_COUNT && (comments && comments.length > DEFAULT_COMMENTS_COUNT))  && <BtnMore onClick={handleBtnShowMoreClick}/>}

          {reviews.length > DEFAULT_COMMENTS_COUNT && <BtnUp onClick={handleBtnUpClick}/>}



    </section>
  );
}
