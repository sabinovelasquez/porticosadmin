export default ngModule => {
  ngModule.controller('EditEventCtrl', function EditEventCtrl(firebaseAPIService, $stateParams, $state) {
    this.eventKey = $stateParams.key;
    this.form = {};
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
    });
    firebaseAPIService.getDevices().then( (data) => {
      this.devices = data;
      angular.forEach(this.devices, (device, key) => {
        if ( device.settings.eventKey === this.eventKey) {
          this.devices[key].checked = true;
        }else {
          this.devices[key].checked = false;
        }
      });
    });
    this.archive = (bol) => {
      firebaseAPIService.archiveEvent(this.eventKey, bol);
      $state.go('main');
    };
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
