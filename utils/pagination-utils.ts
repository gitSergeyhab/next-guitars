import { PageClass, StringPage } from '../const';


const FIRST_PAGE = 1;

const PageDifference = {
  Max: 3,
  Mid: 2,
  Min: 1,
} as const;

const PageNotTransform = {
  First: 1,
  Third: 3,
} as const;


export const getPageCount = (guitarsCount: number, limit: number): number => Math.ceil(guitarsCount / limit);
export const getStartGuitar = (currentPage: number, limit: number) => (currentPage - 1) * limit;


export const getDisplayPages = (pageCount: number, currentPage: number) : number[] => {

  const pages = [
    pageCount === currentPage && pageCount > PageDifference.Mid ? currentPage - PageDifference.Max : null,
    currentPage !== FIRST_PAGE && pageCount > PageDifference.Mid ?  currentPage - PageDifference.Mid : null,
    currentPage - PageDifference.Min > 0 ? currentPage - PageDifference.Min : null,
    currentPage,
    currentPage < pageCount ? currentPage + PageDifference.Min: null,
    currentPage !== pageCount && pageCount > PageDifference.Mid ? currentPage + PageDifference.Mid : null,
    currentPage === FIRST_PAGE && pageCount > PageDifference.Mid ? currentPage + PageDifference.Max : null,
  ];

  const pagesNotNull = pages.filter((item) => item !== null);

  return pagesNotNull as number[];
};


export const getPageVisualData = (pageCount: number, currentPage: number, page: number) => {
  let linkPage = page;
  let classes: string = PageClass.Usual;
  let textPage = page.toString();

  if (page > currentPage + PageDifference.Min) {
    classes = `${classes} ${PageClass.Next}`;
    textPage = StringPage.Next;
  }

  if (page < currentPage - PageDifference.Min) {
    classes = `${classes} ${PageClass.Next}`;
    textPage = StringPage.Prev;
  }

  if (page > currentPage + PageDifference.Min && pageCount > page ) {
    linkPage = page + PageDifference.Min;
  }

  if (page < currentPage - PageDifference.Min &&  page > FIRST_PAGE ) {
    linkPage = page - PageDifference.Min;
  }

  if ((currentPage === pageCount && page === pageCount - PageDifference.Mid) || (currentPage === PageNotTransform.First && page === PageNotTransform.Third)) {
    textPage = page.toString();
    classes = PageClass.Usual;
    linkPage = page;
  }

  if (page === 0) {
    linkPage = FIRST_PAGE;
  }

  if (page === pageCount + PageDifference.Min) {
    linkPage = pageCount;
  }

  classes = currentPage === page ? `${PageClass.Usual} ${PageClass.Active}` : classes;

  return {linkPage, classes, textPage};
};
