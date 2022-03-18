import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BreadcrumbCatalog from '../../components/breadcrumbs/breadcramb-catalog/breadcramb-catalog';
import BreadcrumbMain from '../../components/breadcrumbs/breadcramb-main/breadcramb-main';
import BreadcrumbProduct from '../../components/breadcrumbs/breadcramb-product/breadcramb-product';
import GuitarPageProduct from '../../components/guitar-page-product/guitar-page-product';
import { GuitarPageReviews } from '../../components/guitar-page-reviews/guitar-page-reviews';
import Spinner from '../../components/spinner/spinner';
import { ApiRoute, APPRoute, BASE_URL } from '../../const';
import { Comment, Guitar } from '../../types/types';
import { useRouter } from 'next/router';
import { getComments } from '../../store/guitar-reducer/guitar-reducer-selectors';
import { fetchComments } from '../../store/api-actions';



export const getStaticPaths: GetStaticPaths = async() => {
  const res = await fetch(`${BASE_URL}/${ApiRoute.Guitars}`);
  const data: Guitar[] = await res.json();

  const paths = data.map(({id}) => ({ params: { id: id.toString() } }));

  return { paths, fallback: false };
}



export const getStaticProps: GetStaticProps = async (context) => {

  const { id } = context.params as { id: string };

  const res = await fetch(`${BASE_URL}/${ApiRoute.Guitars}/${id}`);
  const guitar = await res.json();

  if (!guitar) {
    return { notFound: true };
  }

  return {
    props: { guitar }
  }
}




export default function GuitarPage({ guitar } : { guitar: Guitar }): JSX.Element {

  const comments = useSelector(getComments);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchComments(guitar.id.toString()))
  }, [dispatch, guitar])


  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>


        <ul className="breadcrumbs page-content__breadcrumbs">
          <BreadcrumbMain/>
          <BreadcrumbCatalog/>
          <BreadcrumbProduct name={guitar.name}/>
        </ul>

        <GuitarPageProduct guitar={guitar} comments={comments}/>
        <GuitarPageReviews guitar={guitar} comments={comments}/>
      </div>
    </main>
  );
}
