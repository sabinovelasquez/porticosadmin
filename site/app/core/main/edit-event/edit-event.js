export default ngModule => {
  ngModule.controller('EditEventCtrl', function EditEventCtrl(firebaseAPIService, $stateParams, $state) {
    this.eventKey = $stateParams.key;
    this.form = {};
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
    });
    firebaseAPIService.getDevices().then( (data) => {
      this.devices = data;
    });
    this.submit = () => {
      firebaseAPIService.setEventTitle(this.event.title, this.eventKey);
      if (this.form.devices) {
        const devices = Object.keys(this.form.devices);
        angular.forEach(devices, (deviceId) => {
          firebaseAPIService.setDevice(deviceId, this.eventKey);
        });
      }
      $state.go('main');
    };
  });
};
