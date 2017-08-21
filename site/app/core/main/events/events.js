export default ngModule => {
  require('./events.scss');
  ngModule.directive('events', function events(firebaseAPIService, $timeout) {
    return {
      template: require('./events.jade'),
      scope: {},
      controllerAs: 'events',
      controller: function eventsCtrl() {
        this.showArchived = false;
        firebaseAPIService.getEvents().then( (data) => {
          this.events = data;
          this.update();
        });
        this.update = () => {
          $timeout(this.update, 9000);
          angular.forEach(this.events, (value, eventKey) => {
            if (this.events[eventKey].registers) {
              this.events[eventKey].scanned = Object.keys(this.events[eventKey].registers).length;
            }else {
              this.events[eventKey].scanned = 0;
            }
            firebaseAPIService.getEventDevices(eventKey).then( (devices) => {
              this.events[eventKey].devices = devices.length;
            });
          });
        };
      },
    };
  });
};
