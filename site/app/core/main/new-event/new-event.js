export default ngModule => {
  ngModule.controller('NewEventCtrl', function NewEventCtrl(firebaseAPIService, $state) {
    const __ = require('underscore');
    this.sending = false;
    this.hours = [];
    this.tempBlocks = [];
    this.days = {};
    this.blocks = {};
    this.form = {};
    this.form.percent = 80;
    this.enabled = false;
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
      const key = __.findKey(this.tempBlocks, obj);
      this.tempBlocks.splice(key, 1);
    };
    this.deleteDay = (obj) => {
      const key = __.findKey(this.days, obj);
      delete this.days[key];
      if (this.getLength(this.days) === 0) {
        this.enabled = false;
      }
    };
    this.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
    };
    this.addBlock = () => {
      this.tempBlocks.push({start: this.startBlock, end: this.endBlock});
    };
    this.generateHours();
    firebaseAPIService.getDevices().then( (data) => {
      this.devices = data;
    });
    this.getLength = (obj) =>{
      return Object.keys(obj).length;
    };
    this.addDay = () => {
      const day = this.dayTitle.getDate();
      const month = this.dayTitle.getMonth() + 1;
      const year = this.dayTitle.getFullYear();
      this.days[`${day}-${month}-${year}`] = {};
      this.days[`${day}-${month}-${year}`].date = this.dayTitle.toString();
      for (let blocks = 0; blocks < this.tempBlocks.length; blocks ++) {
        this.blocks[blocks] = this.tempBlocks[blocks];
      }
      this.days[`${day}-${month}-${year}`].blocks = this.blocks;
      this.blocks = {};
      this.tempBlocks = [];
      this.startBlock = this.endBlock = '00:00';
      if (this.getLength(this.days) > 0) {
        this.enabled = true;
      }
    };
    this.submit = () => {
      this.sending = true;
      firebaseAPIService.newEvent({title: this.form.title, archived: false, percent: this.form.percent, days: this.days}).then( (data) => {
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
