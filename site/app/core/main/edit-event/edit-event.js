export default ngModule => {
  ngModule.controller('EditEventCtrl', function EditEventCtrl(firebaseAPIService, $state, $stateParams) {
    const __ = require('underscore');
    this.eventKey = $stateParams.key;
    this.sending = false;
    this.hours = [];
    this.tempBlocks = [];
    this.days = {};
    this.blocks = {};
    this.form = {};
    this.form.percent = 80;
    this.enabled = true;
    this.confDel = false;
    this.startBlock = this.endBlock = '00:00';
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
      this.days = data.days;
    });
    firebaseAPIService.getDevices().then( (data) => {
      this.devices = data;
      angular.forEach(this.devices, (device, key) => {
        if ( device.settings.eventKey === this.eventKey) {
          this.devices[key].checked = true;
          this.devices[key][key] = true;
        }else {
          this.devices[key].checked = false;
        }
      });
    });

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
      this.errorDay = '';
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
      if (this.startBlock.length === 5 && this.endBlock.length === 5 && this.startBlock.indexOf(':') === 2 && this.endBlock.indexOf(':') === 2) {
        this.tempBlocks.push({start: this.startBlock, end: this.endBlock});
        this.blockError = '';
      }else {
        this.blockError = 'El formato de hora debe ser del tipo 00:00 (rango de 00:00 a 23:59)';
      }
    };
    this.generateHours();
    this.getLength = (obj) =>{
      return Object.keys(obj).length;
    };
    this.checkDay = () => {
      const day = this.dayTitle.getDate();
      const month = this.dayTitle.getMonth() + 1;
      const year = this.dayTitle.getFullYear();
      if ( !this.days[`${day}-${month}-${year}`] ) {
        this.addDay();
      }else {
        this.errorDay = 'Esta fecha ya ha sido creada, seleccione otra fecha desde el calendario.';
      }
    };
    this.addDay = () => {
      this.errorDay = '';
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
    this.submitForm = () => {
      this.sending = true;
      firebaseAPIService.setEventData(this.event.title, this.eventKey, this.event.percent, this.days);
      this.configDevices();
    };
    this.archive = (bol) => {
      firebaseAPIService.archiveEvent(this.eventKey, bol);
      $state.go('main');
    };
    this.delete = () => {
      firebaseAPIService.deleteEvent(this.eventKey).then( () => {
        $state.go('main');
      });
    };
    this.configDevices = () => {
      angular.forEach(this.devices, (device, key) => {
        if (device[key] === false) {
          delete this.devices[key][key];
        }
        if (this.devices[key][key]) {
          firebaseAPIService.setDevice(key, this.eventKey);
        }
        if (device.checked && !device[key]) {
          firebaseAPIService.setDevice(key, 'no-event');
        }
      });
      this.sending = false;
      $state.go('main');
    };
  });
};

