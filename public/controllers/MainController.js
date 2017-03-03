class MainController {
  constructor(searchService) {
    'ngInject';
    this.searchService = searchService;
  }

  search () {
    this.searchService
      .fetch(this.searchTerm)
      .then(response => {
        this.items = response.data.items;
      });
  }
}

export default MainController;
