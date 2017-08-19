module.exports = () => {
  require('bootstrap/dist/css/bootstrap.css');
  require('angular-ui-bootstrap/dist/ui-bootstrap-csp.css');
  require('animate.css/animate.css');
  require('../index.scss');

  require('angular');
  require('angular-animate');
  require('angular-module-resource');
  require('angular-sanitize');
  require('angular-scroll');
  require('angular-ui-router');
  require('angular-ui-bootstrap');
  require('ngtouch');
  require('ng-parallax');
  require('font-awesome-webpack');

  // polyfills
  require('../polyfills/es2015_ArrayPrototype_find');
};
