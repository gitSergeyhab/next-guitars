import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postComment } from '../../../store/api-actions';
import { Guitar, GuitarWithComments } from '../../../types/types';
import { closePopup } from '../../../utils/utils';
import { ApiRoute, BASE_URL, ESCAPE, SELECTOR_MODAL } from '../../../const';
// import './modal-review.css';


const ZERO_FIELD_VALUE = ' ';

const STARS = [
  {value: 1, name: 'Ужасно'},
  {value: 2, name: 'Плохо'},
  {value: 3, name: 'Нормально'},
  {value: 4, name: 'Хорошо'},
  {value: 5, name: 'Отлично'},
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ReviewStarType = {score: {value: number, name: string}, onChange: () => void,  onMouseEnter: () => void, onMouseLeave: () => void, focusedStar: number, checkedStar: number}


function ReviewStar({score, onMouseEnter, onMouseLeave, onChange, focusedStar, checkedStar}: ReviewStarType): JSX.Element {

  const id = `star-${score.value}`;

  const isStarFilled = focusedStar >= score.value || (!focusedStar && checkedStar >= score.value);

  const usedStarHref = isStarFilled ?
  <svg aria-hidden="true" viewBox="0 0 14 12">
    <path d="M12.0902 4.13787L8.97645 3.70544L7.58451 1.00895C7.54649 0.935124 7.48394 0.875359 7.40668 0.83903C7.21291 0.747624 6.97745 0.823796 6.88056 1.00895L5.48862 3.70544L2.37484 4.13787C2.289 4.14959 2.21051 4.18826 2.15041 4.24685C2.07777 4.3182 2.03773 4.4142 2.03911 4.51374C2.04049 4.61328 2.08317 4.70822 2.15777 4.77771L4.41063 6.87654L3.87838 9.84022C3.8659 9.90917 3.87389 9.98007 3.90143 10.0449C3.92897 10.1097 3.97498 10.1659 4.03422 10.207C4.09346 10.2481 4.16358 10.2725 4.23661 10.2775C4.30964 10.2825 4.38268 10.2678 4.44743 10.2351L7.23254 8.83593L10.0176 10.2351C10.0937 10.2738 10.182 10.2867 10.2666 10.2726C10.48 10.2375 10.6235 10.0441 10.5867 9.84022L10.0544 6.87654L12.3073 4.77771C12.3686 4.72029 12.4091 4.64529 12.4214 4.56326C12.4545 4.35818 12.3048 4.16834 12.0902 4.13787Z" fill="#C90606"/>
  </svg> :
  <svg aria-hidden="true" viewBox="0 0 14 12">
    <path d="M11.481 4.14845L8.65177 3.75745L7.38722 1.32696C7.16064 0.893731 6.50416 0.888224 6.27565 1.32696L5.01109 3.75745L2.18182 4.14845C1.67445 4.21821 1.47111 4.81115 1.83905 5.15075L3.88597 7.04154L3.40183 9.7125C3.31469 10.1953 3.85111 10.5569 4.30038 10.3311L6.83143 9.07L9.36248 10.3311C9.81176 10.5551 10.3482 10.1953 10.261 9.7125L9.7769 7.04154L11.8238 5.15075C12.1918 4.81115 11.9884 4.21821 11.481 4.14845ZM8.77958 6.73314L9.23854 9.27377L6.83143 8.07505L4.42432 9.27377L4.88328 6.73314L2.93513 4.93414L5.62691 4.56332L6.83143 2.25032L8.03595 4.56332L10.7277 4.93414L8.77958 6.73314Z" fill="#C90606"/>
  </svg> ;



  return (
    <>
      <input
        onChange={onChange}
        onFocus={onChange}
        className="visually-hidden" type="radio" id={id} name="rate" value={score.value}
      />
      <label htmlFor={id} title={score.name}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >

        <svg width={20} height={20} aria-hidden="true">
          {usedStarHref}
        </svg>
      </label>
    </>
  );
}


export default function ModalReview({guitar} : {guitar : Guitar | GuitarWithComments}): JSX.Element {

  const { name, id } = guitar;


  const dispatch = useDispatch();
  const closeCartDelete = () => closePopup(dispatch);


  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handlePopupOutClick);

    return function cleanup() {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handlePopupOutClick);
    };
  });


  const handleCloseBtnClick = () => closeCartDelete();

  const [userName, setUserName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorStar, setErrorStar] = useState(false);
  const [focusedStar, setStarFocused] = useState(0);
  const [checkedStar, setStarChecked] = useState(0);


  const handleNameInput = (evt: React.FormEvent<HTMLInputElement>) => {
    setUserName(evt.currentTarget.value);
    setErrorName(false);
  };


  const handleStarChange = (star: number) => {
    setStarChecked(star);
    setErrorStar(false);
  };


  const stars = STARS.map((star) => (
    <ReviewStar score={star} key={star.value} focusedStar={focusedStar} checkedStar={checkedStar} onMouseEnter={() => setStarFocused(star.value)} onChange={() => handleStarChange(star.value)} onMouseLeave={() => setStarFocused(0)}/>),
  );


  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const advantage = advantageRef.current?.value || ZERO_FIELD_VALUE;
    const disadvantage = disadvantageRef.current?.value || ZERO_FIELD_VALUE;
    const comment = commentRef.current?.value || ZERO_FIELD_VALUE;

    setErrorStar(!checkedStar);
    setErrorName(!userName.trim());

    if (checkedStar && userName.trim()) {
      const body = {guitarId: id, rating: checkedStar, userName, advantage, disadvantage, comment};
      dispatch(postComment({body}));
    }
  };

  const handleEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === ESCAPE) {
      closeCartDelete();
    }
  };

  const handlePopupOutClick = (evt: MouseEvent) => {
    if (evt.target instanceof Element && !evt.target.closest(SELECTOR_MODAL)) {
      closeCartDelete();
    }
  };


  return (
    <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px'}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
            <form className="form-review" onSubmit={handleFormSubmit}>
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>

                  <input
                    ref={userNameRef}
                    className="form-review__input form-review__input--name" id="user-name" data-testid='user-name' type="text" autoComplete="off"
                    value={userName}
                    onChange={handleNameInput}
                  />
                  <span className="form-review__warning">
                    {errorName ? 'Заполните поле' : <br/>}
                  </span>

                </div>
                <div><span className="form-review__label form-review__label--required" style={{marginBottom: '10px'}}>Ваша Оценка</span>
                  <div className='rect-rate'>
                    {stars}

                    <span className="rate__count"></span>
                    {errorStar && <span className="rate__message" style={{marginLeft: '-3px'}} >Поставьте оценку</span>}

                  </div>
                </div>

              </div>
              <label className="form-review__label" htmlFor="user-name">Достоинства</label>
              <input
                ref={advantageRef}
                className="form-review__input" id="pros" type="text" autoComplete="off"
              />
              <label className="form-review__label" htmlFor="user-name">Недостатки</label>
              <input
                ref={disadvantageRef}
                className="form-review__input" id="user-name" type="text" autoComplete="off"
              />
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea
                ref={commentRef}

                className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off"
              >
              </textarea>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>


            </form>
            <button
              onClick={handleCloseBtnClick}
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
            >
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
