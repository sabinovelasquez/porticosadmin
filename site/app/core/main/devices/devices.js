export default ngModule => {
  ngModule.controller('DevicesCtrl', function DevicesCtrl(firebaseAPIService) {
    firebaseAPIService.getDevices().then( (data) => {
      this.devices = data;
    });
    this.loading = false;
    firebaseAPIService.getEvents().then( (data) => {
      this.events = data;
    });
    this.getDeviceEvent = (eventKey) => {
      return this.events[eventKey];
    };
    this.saveDevice = (key) => {
      this.loading = true;
      const settings = this.devices[key].settings;
      firebaseAPIService.updateDevice(key).then( (data) => {
        this.loading = false;
        data.settings = settings;
        data.$save();
      });
    };
  });
};
