import { useHistory, useLocation } from 'react-router-dom';

import { getStringCountFromUrl, getTypesFromUrl, makeNewSearch } from '../../../utils/param-utils';
import { getStringsCount } from '../../../utils/utils';
import { ALL_STRINGS, DEFAULT_PAGE_FOR_PUSH, GuitarInfo, GuitarType, GUITAR_TYPES, ParamName } from '../../../const';


function FilterOneType({type}: {type: GuitarType}): JSX.Element {

  const {search} = useLocation();
  const {push} = useHistory();

  const originTypes = getTypesFromUrl(search) as string[];
  const checkedStrings = getStringCountFromUrl(search);

  const isChecked = originTypes.some((item) => item === type);

  const handleTypeChange = () => {
    const types = [...originTypes];
    const index = types.findIndex((item) => item === type);


    if (index === -1) {
      types.push(type);
    } else {
      types.splice(index, 1);
    }

    const stringsFromTypes = getStringsCount(types as GuitarType[]);
    const strings = stringsFromTypes.length ? stringsFromTypes : ALL_STRINGS;
    const newCheckedStrings = checkedStrings.filter((checkedString) => strings.some((string) => string === checkedString));

    let newSearch = makeNewSearch(search, ParamName.Filter.StringCount, newCheckedStrings);
    newSearch = makeNewSearch(newSearch, ParamName.Filter.Type, types);
    newSearch = makeNewSearch(newSearch, ParamName.Range.Page, DEFAULT_PAGE_FOR_PUSH);
    push(newSearch);
  };

  const {name} = GuitarInfo[type];
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        data-testid={`type-${type}`}
        className="visually-hidden" type="checkbox"
        id={type} name={type}
        onChange={handleTypeChange}
        checked={isChecked}
      />
      <label htmlFor={type}>{name}</label>
    </div>
  );
}


export default function FilterType(): JSX.Element {

  const types = GUITAR_TYPES.map((item) => <FilterOneType type={item} key={item} />);

  return (
    <fieldset className="catalog-filter__block">

      {types}

    </fieldset>
  );
}


