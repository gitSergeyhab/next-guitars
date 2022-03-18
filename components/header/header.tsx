import HeaderCart from '../header-cart/header-cart';
import HeaderNav from '../header-nav/header-nav';
import HeaderSearch from '../header-search/header-search';
import { APPRoute } from '../../const';
import Link from 'next/link';


export default function Header(): JSX.Element {

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">

        <Link  href={APPRoute.Main}>
          <a className="header__logo logo">
            <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/>
          </a>

        </Link>

        <HeaderNav/>
        <HeaderSearch/>
        <HeaderCart/>

      </div>
    </header>
  );
}
