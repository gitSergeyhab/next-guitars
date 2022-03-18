import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCartGuitars, setPopupType } from '../../../store/actions';
import { getCartGuitars } from '../../../store/cart-reducer/cart-reducer-selectors';
import { Guitar, GuitarWithComments } from '../../../types/types';
import { changeGuitarInCart, closePopup, getTruePath, makeStringPrice } from '../../../utils/utils';
import { ESCAPE, GuitarInfo, GuitarType, PopupType, SELECTOR_MODAL } from '../../../const';
import { setCartGuitarsToStorage } from '../../../utils/cart-storage-utils';


export default function CartAdd({guitar} : {guitar : Guitar | GuitarWithComments}): JSX.Element {

  const {previewImg, name, price,stringCount,type, vendorCode } = guitar;

  const stringPrice = makeStringPrice(price);


  const {src, srcSet} = getTruePath(previewImg);

  const dispatch = useDispatch();
  const closeCartAdd = () => closePopup(dispatch);


  const handleEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === ESCAPE) {
      closeCartAdd();
    }
  };

  const handlePopupOutClick = (evt: MouseEvent) => { // MouseEvent не из Реакт!
    if (evt.target instanceof Element && !evt.target.closest(SELECTOR_MODAL)) {
      closeCartAdd();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handlePopupOutClick);

    return function cleanup() {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handlePopupOutClick);
    };
  });

  const handleCloseBtnClick = () => closeCartAdd();

  const cartGuitarsOrigin = useSelector(getCartGuitars);

  const handleAddBtnClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const cartGuitars = [...cartGuitarsOrigin];
    const newCartGuitars = changeGuitarInCart({...guitar, comments: [], description: ''}, cartGuitars, true);
    setCartGuitarsToStorage(newCartGuitars);
    dispatch(setCartGuitars(newCartGuitars));
    dispatch(setPopupType(PopupType.SuccessAddToCard));
  };

  return (
    <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={src} srcSet={srcSet} width="67" height="137" alt={name}/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{GuitarInfo[type as GuitarType].nameOne}, {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{stringPrice} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                onClick={handleAddBtnClick}
                className="button button--red button--big modal__button modal__button--add"
              >
                Добавить в корзину
              </button>
            </div>
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
