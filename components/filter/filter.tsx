import FilterPrice from './filter-price/filter-price';
import FilterString from './filter-string/filter-string';
import FilterType from './filter-type/filter-type';


export default function Filter(): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <FilterPrice/>
      <FilterType/>
      <FilterString/>

    </form>
  );
}
