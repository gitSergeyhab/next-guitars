import { Route, Routes } from 'react-router-dom';

import CartPage from '../cart/cart';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import GuitarPage from '../guitar-page/guitar-page';
import Header from '../header/header';
import Main from '../main/main';
import Modal from '../modals/modal';
import NotFoundPage from '../not-found-page/not-found-page';
import { APPRoute } from '../../const';


export default function App(): JSX.Element {

  return (
    <>
      <Header/>
        <Routes>
          <Route path={APPRoute.Main} element={<Main/>}/>
          <Route  path={APPRoute.Catalog} element={<Catalog/>}/>
          <Route  path={APPRoute.Guitars} element={<GuitarPage/>}/>
          <Route  path={APPRoute.Cart} element={<CartPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      <Footer/>
      <Modal/>
    </>
  );
}

