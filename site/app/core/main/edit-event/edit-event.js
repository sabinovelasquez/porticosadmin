export default ngModule => {
  ngModule.controller('EditEventCtrl', function EditEventCtrl(firebaseAPIService, $stateParams, $state) {
    this.eventKey = $stateParams.key;
    this.form = {};
    this.hours = [];
    this.startBlock = this.endBlock = '00:00';
    this.generateHours = () => {
      for ( let hour = 0; hour < 24; hour++) {
        if (hour < 10) {
          hour = `0${hour}`;
        }
        this.hours.push(`${hour}:00`);
      }
    };
    this.generateHours();
    this.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
    };
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
      firebaseAPIService.setEventData(this.event.title, this.eventKey, this.event.percent);
      if (this.form.devices) {
        const devices = Object.keys(this.form.devices);
        angular.forEach(devices, (deviceId) => {
          firebaseAPIService.setDevice(deviceId, this.eventKey);
        });
      }
      $state.go('view-event', {key: this.eventKey});
    };
  });
};
