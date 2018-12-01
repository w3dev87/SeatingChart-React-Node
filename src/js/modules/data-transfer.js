export default class DataTrasfer {
  constructor(options) {
    this.cacheName = options.cacheName;

    this.saveAppData = this.saveAppData.bind(this);
  }

  getInitialAppData() {
    if(localStorage.getItem(this.cacheName)) {
      let parsedData = JSON.parse(localStorage.getItem(this.cacheName));
      return parsedData;
    }
    else {
      return [];
    }
  }

  saveAppData(data) {
    let stringData = JSON.stringify(data);
    localStorage.setItem(this.cacheName, stringData);
  }
}

module.exports = DataTrasfer;