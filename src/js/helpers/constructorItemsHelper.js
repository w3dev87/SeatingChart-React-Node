
// Match the type ids used in constructorObjects.json to load the related file
const mapTypeToSvgFile = {
  1000: require('./../../img/svg/chair.svg'),
  1001: require('./../../img/svg/table_square_4.svg'),
  1002: require('./../../img/svg/table_square_8.svg'),
  1003: require('./../../img/svg/table_only_square_4.svg'),
  1004: require('./../../img/svg/table_only_square_8.svg'),
  1005: require('./../../img/svg/table_rectangle_8.svg'),
  1006: require('./../../img/svg/table_rectangle_12.svg'),
  1007: require('./../../img/svg/table_only_circle_4.svg'),
  1008: require('./../../img/svg/table_circle_4.svg')
};

// Will be used for type ids in json that are not mapped above
const defaultSVGFile = require('./../../img/svg/chair.svg');

export default class ConstructorItemsHelper {
  constructor(objects) {
    this.objects = objects;
  }

  getItems() {
    return this.objects;
  }

  /***
   * This function is only created as a solution to flatten the constructorObjects.json to make the
   * search inside this collection easier for canvas component. However, it may hurt the data structure
   * of the projects since it is ruining the source of the truth in the application.
   * The reason that constructoObjects.json is not created flat in the first place is to make it easier to
   * edit it by hand. Later on we may come up with a better solution with this part. github/p0o
   *
   * @returns {Array} The flatten version of constructorObjects.json
   */
  getFlattenItems() {
    let collection = [];
    this.objects.forEach((categoryCollection) => {
      categoryCollection.items.forEach((categoryItems) => {
        collection.push({
          categoryName: categoryCollection.categoryName,
          ...categoryItems
        });
      })
    });
    return collection;
  }

  getSVGBasedOnType(type) {
    return mapTypeToSvgFile[type] || defaultSVGFile;
  }
}
