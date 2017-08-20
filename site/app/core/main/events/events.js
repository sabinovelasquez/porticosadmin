export default ngModule => {
  require('./events.scss');
  ngModule.directive('events', function events(firebaseAPIService) {
    return {
      template: require('./events.jade'),
      scope: {},
      controllerAs: 'events',
      controller: function eventsCtrl() {
        firebaseAPIService.getEvents().$loaded().then( (data) => {
          this.events = data;
          angular.forEach(this.events, (value, eventKey) => {
            firebaseAPIService.getEventDevices(eventKey).$loaded().then( (devices) => {
              this.events[eventKey].devices = devices.length;
            });
          });
        });
      },
    };
  });
};
