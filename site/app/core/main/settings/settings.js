export default ngModule => {
  require('./settings.scss');

  ngModule.directive('settings', function settings() {
    return {
      template: require('./settings.jade'),
      scope: {},
      controllerAs: 'settings',
      controller: function settingsCtrl() {
        this.parallaxBg = 'img/settings.jpg';
      },
    };
  });
};
