const BASE_URL = "http://127.0.0.1:3000";

const MAX_CARS_PER_PAGE = 7;
const MAX_WINNERS_PER_PAGE = 10;
const DEFAULT_SORT = "id";
const DEFAULT_ORDER = "asc";

const urlPaths = {
  Garage: `${BASE_URL}/garage`,
  Winners: `${BASE_URL}/winners`,
  Engine: `${BASE_URL}/engine`,
};

export {
  urlPaths,
  MAX_CARS_PER_PAGE,
  MAX_WINNERS_PER_PAGE,
  DEFAULT_SORT,
  DEFAULT_ORDER,
};
