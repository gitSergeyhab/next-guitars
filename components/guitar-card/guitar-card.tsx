import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../rating/rating';
import { setPopupType, setGuitarToPopup } from '../../store/actions';
import { GuitarWithComments } from '../../types/types';
import { checkGuitarInCart, getRealRating, getTruePath, makeStringPrice } from '../../utils/utils';
import { APPRoute, PopupType } from '../../const';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import Link from 'next/link';


const GUITAR_PATH = 'guitars';

export default function GuitarCard({guitar} : {guitar : GuitarWithComments}): JSX.Element {
  const {id, name, previewImg, price, rating, comments} = guitar;

  const realRating = comments.length ? getRealRating(comments) : rating;

  const stringPrice = makeStringPrice(price);
  const cartGuitars = useSelector(getCartGuitars);
  const isGuitarInCart = checkGuitarInCart(cartGuitars, id);

  const {src, srcSet} = getTruePath(previewImg);
  const guitarPath = `${GUITAR_PATH}/${id}`;

  const dispatch = useDispatch();
  const handleBuyClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartAdd));
  };

  return (

    <div className="product-card"><img src={src} srcSet={srcSet} width="75" height="190" alt="СURT Z30 Plus Acoustics"/>

      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <Rating rating={realRating} height='12' width='14'/>

          <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{stringPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link  href={guitarPath}><a className="button button--mini">Подробнее</a></Link>

        {
          isGuitarInCart
            ?
            <Link  href={APPRoute.Cart}>
              <a className="button button--red-border button--mini button--in-cart">В Корзине</a>
              </Link>
            :
            <Link  href={'/'}>
              <a
                onClick={handleBuyClick}
                className="button button--red button--mini button--add-to-cart"
              >Купить</a>
            </Link>

        }


      </div>
    </div>
  );
}
