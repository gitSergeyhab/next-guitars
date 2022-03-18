import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { APPRoute } from '../../const';
import { setGuitarsLoadingStatus } from '../../store/actions';


const CLASS_CURRENT = 'link--current';


export default function HeaderNav(): JSX.Element {

  const location = useLocation();
  const dispatch = useDispatch();

  const handleCatalogClick = () => dispatch(setGuitarsLoadingStatus(true));

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <Link href={APPRoute.Catalog}>
            <a
              onClick={handleCatalogClick}
              className={`link main-nav__link ${location.pathname === APPRoute.Catalog ? CLASS_CURRENT : ''}`}
            >
              Каталог
            </a>
          </Link>
        </li>
        <li>
          <Link  href={APPRoute.Contacts}>
            <a className="link main-nav__link">
              Где купить?
            </a>
          </Link>
        </li>
        <li>
          <Link href={APPRoute.Info}>
            <a  className="link main-nav__link">
              О компании
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
