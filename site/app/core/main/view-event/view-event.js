export default ngModule => {
  ngModule.controller('ViewEventCtrl', function ViewEventCtrl(firebaseAPIService, $stateParams) {
    this.eventKey = $stateParams.key;
    this.loading = true;
    this.devices = {};
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
    });
    firebaseAPIService.getDevices().then( (data) => {
      this.loading = false;
      angular.forEach(data, (device, key) => {
        if ( device.settings.eventKey === this.eventKey) {
          this.devices[key] = device;
        }
      });
    });
  });
};
