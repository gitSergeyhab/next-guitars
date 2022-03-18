import Link from 'next/link';
import { APPRoute, PageName } from '../../../const';


export default function BreadcrumbCart(): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link  href={APPRoute.Cart}>
        <a className="link">{PageName.Cart}</a>
      </Link>
    </li>
  );
}
