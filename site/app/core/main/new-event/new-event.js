export default ngModule => {
  ngModule.controller('NewEventCtrl', function NewEventCtrl(firebaseAPIService, $state) {
    firebaseAPIService.getDevices().then( (data) => {
      this.devices = data;
    });
    this.hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];
    this.submit = () => {
      firebaseAPIService.newEvent({title: this.form.title, archived: false, percent: this.form.percent}).then( (data) => {
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
      $state.go('main');
    };
  });
};
