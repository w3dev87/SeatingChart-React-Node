
// ID numbers are related to /assets/constructorObjects.json
export const getEmptyTable = (categoryId) => {
  const tablesMapBasedOnCatId = {
    'SQUARE_TABLES': require('./../../img/svg/table_only_square_4.svg'),
    'RECTANGLE_TABLES': require('./../../img/svg/table_only_square_4.svg'),
    'CIRCLE_TABLES': require('./../../img/svg/table_only_circle_4.svg')
  };
  return tablesMapBasedOnCatId[categoryId];
};

export const getChairSvg = () => {
  return require('./../../img/svg/chair.svg');
};
