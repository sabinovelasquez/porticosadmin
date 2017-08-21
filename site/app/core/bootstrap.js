require('./vendor')();

const ngModule = angular.module('app', [
  'duScroll',
  'ngAnimate',
  'ngParallax',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'ui.router',
  'firebase',
  'ngCsv',
]);

require('./config')(ngModule);
require('./controllers')(ngModule);
require('./directives')(ngModule);
require('./services')(ngModule);

const firebaseConfig = {
  apiKey: 'AIzaSyD2yyAV6j40TlyQgg7d8tXZq0f8yaYpCbM',
  authDomain: 'porticos-18e1d.firebaseapp.com',
  databaseURL: 'https://porticos-18e1d.firebaseio.com',
  projectId: 'porticos-18e1d',
  storageBucket: 'porticos-18e1d.appspot.com',
  messagingSenderId: '578629257790',
};
const firebase = require('firebase');

firebase.initializeApp(firebaseConfig);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['app'], {
  	//
  });
});
