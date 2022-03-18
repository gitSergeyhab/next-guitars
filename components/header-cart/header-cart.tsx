import { useSelector } from 'react-redux';

import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { APPRoute } from '../../const';
import Link from 'next/link';


export default function HeaderCart(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);

  const guitarCount = cartGuitars.reduce((acc, item) => acc + item.count , 0);

  return (
    <Link  href={APPRoute.Cart} aria-label="Корзина">
      <a className="header__cart-link">
        <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
          <use xlinkHref="#icon-basket"></use>
        </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">{guitarCount}</span>
      </a>
    </Link>
  );
}
