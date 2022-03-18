import Link from 'next/link';
import { APPRoute, PageName } from '../../../const';


export default function BreadcrumbMain(): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link href={APPRoute.Main}>
        <a  className="link">{PageName.Main}</a>
      </Link>
    </li>
  );
}
