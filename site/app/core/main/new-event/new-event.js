export default ngModule => {
  ngModule.controller('NewEventCtrl', function NewEventCtrl(firebaseAPIService) {
    firebaseAPIService.getDevices().$loaded().then( (data) => {
      this.devices = data;
    });
    this.submit = () => {
      firebaseAPIService.newEvent({title: this.form.title}).then( (data) => {
        this.configDevices(data.key);
      });
    };
    this.configDevices = (eventKey) => {
      if (this.form.devices) {
        const devices = Object.keys(this.form.devices);
        angular.forEach(devices, (deviceId) => {
          firebaseAPIService.setDevice(deviceId, eventKey);
        });
      }
    };
  });
};
