export default ngModule => {
  ngModule.config(
    ($stateProvider, $urlRouterProvider) => {
      $urlRouterProvider.otherwise('/');
      $stateProvider
      .state('main', {
        url: '/',
        template: require('../main/main.jade'),
        controller: 'MainCtrl',
        controllerAs: 'main',
      })
      .state('new-event', {
        url: '/new-event',
        template: require('../main/new-event/new-event.jade'),
        controller: 'NewEventCtrl',
        controllerAs: 'newEvent',
      })
      .state('edit-event', {
        url: '/edit-event/:key',
        template: require('../main/edit-event/edit-event.jade'),
        controller: 'EditEventCtrl',
        controllerAs: 'editEvent',
      })
      .state('view-event', {
        url: '/view-event/:key',
        template: require('../main/view-event/view-event.jade'),
        controller: 'ViewEventCtrl',
        controllerAs: 'viewEvent',
      })
      .state('devices', {
        url: '/devices',
        template: require('../main/devices/devices.jade'),
        controller: 'DevicesCtrl',
        controllerAs: 'devices',
      });
    }
  );
};
