import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getGuitarCount } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { getDisplayPages, getPageVisualData } from '../../utils/pagination-utils';
import { getPageParamsFromUrl, makeNewSearch } from '../../utils/param-utils';
import { ParamName } from '../../const';


function Page({page} : {page : number}): JSX.Element {

  const guitarCount = useSelector(getGuitarCount);

  const {push} = useHistory();
  const {search} = useLocation();
  const {currentPage, pageCount} = getPageParamsFromUrl(search, guitarCount);

  const {linkPage, classes, textPage} = getPageVisualData(pageCount, currentPage, page);


  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const newSearch = makeNewSearch(search, ParamName.Range.Page, linkPage);
    push(newSearch);
  };

  return (
    <li className={classes}>
      <a
        onClick={handlePageClick}
        className="link pagination__page-link" href='/'
      >
        {textPage}
      </a>
    </li>
  );
}

export default function Pagination(): JSX.Element {

  const guitarCount = useSelector(getGuitarCount);

  const {search} = useLocation();
  const {currentPage, pageCount} = getPageParamsFromUrl(search, guitarCount);

  const displayPages = getDisplayPages(pageCount, currentPage);

  const pages = displayPages.map((page) => <Page page={page} key={page}/> );

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {pages}

      </ul>
    </div>
  );
}
