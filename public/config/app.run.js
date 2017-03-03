function AppRun(AppConstants, $rootScope) {
  'ngInject';

  // Change page title based on state
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };
}

export default AppRun;
