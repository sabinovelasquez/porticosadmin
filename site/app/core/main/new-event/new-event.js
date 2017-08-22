export default ngModule => {
  ngModule.controller('NewEventCtrl', function NewEventCtrl(firebaseAPIService, $state) {
    const __ = require('underscore');
    this.hours = [];
    this.blocks = {};
    this.currentBlock = 0;
    this.startBlock = this.endBlock = '00:00';
    this.generateHours = () => {
      for ( let hour = 0; hour < 24; hour++) {
        if (hour < 10) {
          hour = `0${hour}`;
        }
        this.hours.push(`${hour}:00`);
      }
    };
    this.deleteBlock = (obj) => {
      const key = __.findKey(this.blocks, obj);
      delete this.blocks[key];
    };
    this.addBlock = () => {
      this.blocks[this.currentBlock] = {start: this.startBlock, end: this.endBlock};
      this.currentBlock ++;
    };
    this.generateHours();
    firebaseAPIService.getDevices().then( (data) => {
      this.devices = data;
    });
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
