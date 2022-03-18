import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BreadcrumbMain from '../breadcrumbs/breadcramb-main/breadcramb-main';
import BreadcrumbCatalog from '../breadcrumbs/breadcramb-catalog/breadcramb-catalog';
import BreadcrumbProduct from '../breadcrumbs/breadcramb-product/breadcramb-product';
import GuitarPageProduct from '../guitar-page-product/guitar-page-product';
import { fetchComments, fetchTheGuitar } from '../../store/api-actions';
import { GuitarPageReviews } from '../guitar-page-reviews/guitar-page-reviews';
import { getGuitarErrorStatus, getGuitarLoadingStatus, getTheGuitar } from '../../store/guitar-reducer/guitar-reducer-selectors';
import Spinner from '../spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';


export default function GuitarPage(): JSX.Element {

  const guitar = useSelector(getTheGuitar);
  const isError = useSelector(getGuitarErrorStatus);
  const isLoading = useSelector(getGuitarLoadingStatus);

  const dispatch = useDispatch();

  const {id}: {id: string} = useParams();

  useEffect(() => {
    dispatch(fetchTheGuitar(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [id, dispatch]);


  if (isLoading ) {
    return <Spinner/>;
  }

  if (isError || !guitar) {
    return <NotFoundPage/>;
  }

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>

        <ul className="breadcrumbs page-content__breadcrumbs">
          <BreadcrumbMain/>
          <BreadcrumbCatalog/>
          <BreadcrumbProduct name={guitar.name}/>
        </ul>

        <GuitarPageProduct guitar={guitar}/>
        <GuitarPageReviews/>
      </div>
    </main>
  );
}
