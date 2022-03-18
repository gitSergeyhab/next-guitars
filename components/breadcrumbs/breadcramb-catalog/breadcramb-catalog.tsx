import Link from 'next/link';
import { APPRoute, PageName } from '../../../const';


export default function BreadcrumbCatalog(): JSX.Element {

  return (
    <li className="breadcrumbs__item">
      <Link href={APPRoute.Catalog}>
        <a className="link">{PageName.Catalog}</a>

      </Link>
    </li>
  );
}
