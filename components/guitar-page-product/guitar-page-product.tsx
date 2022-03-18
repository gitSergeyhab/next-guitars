import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../rating/rating';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { Comment, Guitar } from '../../types/types';
import { getRealRating, getTruePath, makeStringPrice } from '../../utils/utils';
import { GuitarInfo, GuitarType, HIDDEN_CLASS, PopupType } from '../../const';
import Link from 'next/link';


const BLACK_BORDER_CLASS = 'button--black-border';

const enum Option {
  Characteristic = 'Characteristic',
  Description = 'Description',
}

type GuitarPageProductProps = {
  guitar : Guitar,
  comments: Comment[] | undefined,
}


export default function GuitarPageProduct({guitar, comments} : GuitarPageProductProps): JSX.Element{

  const dispatch = useDispatch();

  const [option, setOption] = useState(Option.Characteristic);


  const {name, previewImg, price, stringCount, type, vendorCode, description} = guitar;
  const stringPrice = makeStringPrice(price);

  const realRating = (comments && comments.length) ? getRealRating(comments) : null;

  const rusType = GuitarInfo[type as GuitarType].nameOne;

  const {src, srcSet} = getTruePath(previewImg);

  const handleCharacteristicClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setOption(Option.Characteristic);
  };

  const handleDescriptionClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setOption(Option.Description);
  };

  const handleBuyClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartAdd));
  };


  return (
    <div className="product-container">
      <img className="product-container__img" src={src} srcSet={srcSet} width="90" height="235" alt={name}/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

        { realRating ?  <Rating rating={realRating} height='14' width='14'/> : <div style={{height: 14, width: 14}}></div> }

          <span className="rate__count">{comments ? comments.length : ''}</span><span className="rate__message"></span>

        </div>
        <div className="tabs">
          <a
            className={`button button--medium tabs__button ${option === Option.Description && BLACK_BORDER_CLASS}`}
            href="#characteristics"
            onClick={handleCharacteristicClick}
          >
             Характеристики
          </a>
          <a
            className={`button button--medium tabs__button ${option === Option.Characteristic && BLACK_BORDER_CLASS}`}
            href="#description"
            onClick={handleDescriptionClick}
          >
            Описание
          </a>
          <div className="tabs__content" id="characteristics"  >
            <table className={`tabs__table ${option === Option.Description && HIDDEN_CLASS}`}>
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{rusType}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{stringCount} струнная</td>
                </tr>
              </tbody>
            </table>
            <p className={`tabs__product-description ${option === Option.Characteristic && HIDDEN_CLASS}`}>{description}</p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{stringPrice} ₽</p>
        <Link href={'/'}>
        <a
            onClick={handleBuyClick}
            className="button button--red button--big product-container__button"
          >Добавить в корзину
        </a>
        </Link>

      </div>
    </div>
  );
}
