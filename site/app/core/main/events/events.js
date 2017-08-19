export default ngModule => {
  require('./events.scss');

  ngModule.directive('events', function events() {
    return {
      template: require('./events.jade'),
      scope: {},
      controllerAs: 'events',
      controller: function eventsCtrl() {
        // this.parallaxBg = 'img/events.jpg';
      },
    };
  });
};
