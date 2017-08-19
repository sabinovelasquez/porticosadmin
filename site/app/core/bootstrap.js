require('./vendor')();

const ngModule = angular.module('app', [
  'duScroll',
  'ngAnimate',
  'ngParallax',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'ui.router',
]);

require('./config')(ngModule);
require('./controllers')(ngModule);
require('./directives')(ngModule);
// require('./services')(ngModule);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['app'], {
  	//
  });
});
