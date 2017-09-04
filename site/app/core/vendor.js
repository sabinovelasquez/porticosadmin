module.exports = () => {
  require('bootstrap/dist/css/bootstrap.css');
  require('angular-ui-bootstrap/dist/ui-bootstrap-csp.css');
  require('animate.css/animate.css');
  require('angular-material/angular-material.css');
  require('../index.scss');

  require('angular');
  require('angular-animate');
  require('angular-sanitize');
  require('angular-scroll');
  require('angular-ui-router');
  require('angular-ui-bootstrap');
  require('angular-aria');
  require('ngtouch');
  require('ng-parallax');
  require('font-awesome-webpack');
  require('firebase');
  require('angularfire');
  require('angular-material');
  require('../../bower_components/ng-table-to-csv/dist/ng-table-to-csv');
  // polyfills
  require('../polyfills/es2015_ArrayPrototype_find');
};
