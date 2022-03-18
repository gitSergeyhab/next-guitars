
export const ESCAPE = 'Escape';

export const SELECTOR_MODAL = '.modal__content';

export const HIDDEN_CLASS = 'hidden';

export const MESSAGE_NO_GUITARS = 'Ты угадал! Именно таких гитар у нас нет...';

export const EMPTY_CART_TEXT = 'Корзина пуста';

export const DEFAULT_PAGE_FOR_PUSH = 1;

export const DEFAULT_COMMENTS_COUNT = 3;

export const GUITARS_PER_PAGE = 9;

export const MAX_RATING = 5;

export const ALL_STRINGS = [4, 6, 7, 12];


export const enum APPRoute {
  Main = '/',
  Catalog = '/catalog',
  Guitars = '/guitars/:id',
  Cart = '/cart',
  Contacts = '/contacts',
  Info = '/info',
}


export const enum ApiRoute {
  Guitars = 'guitars',
  Comments = 'comments',
  Coupons = 'coupons',
  Orders = 'orders',
}

export const enum GuitarType {
  Electric = 'electric',
  Ukulele = 'ukulele',
  Acoustic = 'acoustic',
}

export const GUITAR_TYPES = [GuitarType.Acoustic, GuitarType.Electric, GuitarType.Ukulele];

export const GuitarInfo = {
  [GuitarType.Electric] : {name: 'Электрогитары', nameOne: 'Электрогитара', strings: [4, 6, 7]},
  [GuitarType.Ukulele] : {name: 'Укулеле', nameOne: 'Укулеле',strings: [4]},
  [GuitarType.Acoustic] : {name: 'Акустические гитары', nameOne: 'Акустическиая гитара',strings: [6, 7, 12 ]},
} as const;

export const ParamName = {
  Filter: {
    Type: 'type',
    PriceLte: 'price_lte',
    PriceGte: 'price_gte',
    StringCount: 'stringCount',
  },
  Sort: {
    Sort: '_sort',
    Price: 'price',
    Rating: 'rating',
    Order: '_order',
    Desc: 'desc',
    Asc: 'asc',
    Origin: 'Origin',
  },
  Range: {
    Start: '_start',
    End: '_end',
    Limit: '_limit',
    Page: '_page',
  },
  Search: {
    NameLike: 'name_like',
  },
  Embed: {
    Embed: '_embed',
    Comment: 'comments',
  },
} as const;

export const enum PopupType {
  CartAdd = 'CartAdd',
  CartDelete = 'CartDelete',
  Review = 'Review',
  SuccessAddToCard = 'SuccessAddToCard',
  SuccessReview = 'SuccessReview',
}

export const enum StringPage {
  Prev = 'Назад',
  Next = 'Далее',
}

export const enum PageClass {
  Next = 'pagination__page--next',
  Active = 'pagination__page--active',
  Usual = 'pagination__page',
}

export const enum PageName {
  Main = 'Главная',
  Catalog = 'Каталог',
  Product = 'Товар',
  Cart = 'Корзина',
  Contacts = 'Где купить',
  Info = 'О компании',
}
export const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
