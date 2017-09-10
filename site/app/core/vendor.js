module.exports = () => {
  require('animate.css/animate.css');
  require('angular-material/angular-material.css');
  require('../index.scss');

  require('angular');
  require('angular-animate');
  require('angular-sanitize');
  require('angular-ui-router');
  require('angular-aria');
  require('firebase');
  require('angularfire');
  require('angular-material');
  require('../../bower_components/ng-table-to-csv/dist/ng-table-to-csv');
  // polyfills
  require('../polyfills/es2015_ArrayPrototype_find');
};
