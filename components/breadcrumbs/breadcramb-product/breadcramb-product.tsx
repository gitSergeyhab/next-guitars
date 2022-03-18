import Link from 'next/link';
import { APPRoute } from '../../../const';


export default function BreadcrumbProduct({name} : {name: string}): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link  href={APPRoute.Guitars}>
        <a className="link">{name}</a>

      </Link>
    </li>
  );
}
