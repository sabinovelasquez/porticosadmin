export default ngModule => {
  require('./events.scss');
  ngModule.directive('events', function events(firebaseAPIService, $timeout) {
    return {
      template: require('./events.pug'),
      scope: {},
      controllerAs: 'events',
      controller: function eventsCtrl() {
        const __ = require('underscore');
        this.showArchived = false;
        firebaseAPIService.getEvents().then( (data) => {
          this.events = data;
          this.update();
        });
        this.getLength = (obj) =>{
          return Object.keys(obj).length;
        };
        this.update = () => {
          $timeout(this.update, 9000);
          angular.forEach(this.events, (value, eventKey) => {
            if (this.events[eventKey].registers) {
              this.events[eventKey].scanned = Object.keys(this.events[eventKey].registers).length;
              this.events[eventKey].users = Object.keys(__.countBy(this.events[eventKey].registers, 'code')).length;
            }else {
              this.events[eventKey].scanned = this.events[eventKey].users = 0;
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
