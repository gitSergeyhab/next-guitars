import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HIDDEN_CLASS } from '../../const';

import useDebounce from '../../hooks/use-debounce';
import { loadSearchGuitars } from '../../store/actions';
import { fetchGuitarsWithSearch } from '../../store/api-actions';
import { getSearchGuitars, getSearchLoadingStatus } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { Guitar } from '../../types/types';


const GUITAR_PATH = '/guitars';
const ENTER = 'Enter';


function OneSearchGuitar({guitar, onClick} : {guitar: Guitar, onClick: () => void}): JSX.Element{

  const history = useHistory();
  const dispatch = useDispatch();

  const {id, name} = guitar;

  const handleGuitarClick = () => {
    history.push(`${GUITAR_PATH}/${id}`);
    dispatch(loadSearchGuitars([]));
    onClick();
  };

  return (
    <li
      onClick={handleGuitarClick}
      onKeyDown={(evt) => {
        if (evt.code === ENTER) {
          evt.currentTarget.click();
        }
      }}
      className="form-search__select-item" tabIndex={0}
    >
      {name}
    </li>);
}


export default function HeaderSearch(): JSX.Element {

  const searchGuitars = useSelector(getSearchGuitars);

  const dispatch = useDispatch();
  const isLoading = useSelector(getSearchLoadingStatus);

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const handleSearchInput = (evt: FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      dispatch(fetchGuitarsWithSearch(debouncedValue));
    } else {
      dispatch(loadSearchGuitars([]));
    }
  }, [debouncedValue, dispatch]);

  const guitars = searchGuitars.map((guitar) => <OneSearchGuitar guitar={guitar} key={guitar.id} onClick={() => setValue('')}/>);

  const guitarList = isLoading ? null : <ul className={`form-search__select-list ${debouncedValue.length && value.length? '' : HIDDEN_CLASS}`} style={{zIndex: 2}}>{ guitars }</ul>;

  return (

    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          value={value}
          onChange={handleSearchInput}
          className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>

      { guitars.length ? guitarList : null }

    </div>
  );
}
