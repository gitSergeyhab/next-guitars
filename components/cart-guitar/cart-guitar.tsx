import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { setPopupType, setGuitarToPopup } from '../../store/actions';
import { CartGuitar } from '../../types/types';
import { getTruePath, makeStringPrice } from '../../utils/utils';
import { PopupType } from '../../const';


// С Л Е Д У Ю Щ И Й   Э Т А П


export default function OneCartGuitar({cartGuitar} : {cartGuitar: CartGuitar}): JSX.Element {

  const {guitar, count} = cartGuitar;
  const {name, stringCount, type, vendorCode, price, previewImg} = guitar;
  const {src, srcSet} = getTruePath(previewImg);

  const stringPrice = makeStringPrice(price);

  const dispatch = useDispatch();

  const handlePluseClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartAdd));
  };

  const handleMinusClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartDelete));
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={src} srcSet={srcSet} width="55" height="130" alt={name}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{type}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{stringPrice} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button" aria-label="Уменьшить количество"
          onClick={handleMinusClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={`${count}`} id="4-count" name="4-count" max="99"/>
        <button
          className="quantity__button" aria-label="Увеличить количество"
          onClick={handlePluseClick}

        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{makeStringPrice(price * count)} ₽</div>
    </div>
  );
}
