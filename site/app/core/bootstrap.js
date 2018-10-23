require('./vendor')();

const ngModule = angular.module('app', [
  'duScroll',
  // 'ngAnimate',
  // 'ngParallax',
  'ngTouch',
  'ui.bootstrap',
  'ui.router',
  'firebase',
  'ngTableToCsv',
  'AngularPrint',
]);

const firebaseConfig = {
  apiKey: 'AIzaSyDRRYHq8O9M_LZmiKVWmc8eOL83LbK0S5I',
  authDomain: 'scanpad-net.firebaseapp.com',
  databaseURL: 'https://scanpad-net.firebaseio.com',
  projectId: 'scanpad-net',
  storageBucket: '',
  messagingSenderId: '201822480848',
};
const firebase = require('firebase');

firebase.initializeApp(firebaseConfig);

require('./config')(ngModule);
require('./controllers')(ngModule);
require('./directives')(ngModule);
require('./services')(ngModule);
require('./factory')(ngModule);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['app'], {
  	//
  });
});
