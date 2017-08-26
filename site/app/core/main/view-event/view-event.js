export default ngModule => {
  ngModule.controller('ViewEventCtrl', function ViewEventCtrl(firebaseAPIService, $stateParams) {
    this.eventKey = $stateParams.key;
    const __ = require('underscore');
    const moment = require('moment');
    this.loading = true;
    this.excel = [];
    this.devices = {};
    this.headers = ['Código', 'Fecha', 'Bloque', 'Hora', 'Sala'];
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
      console.log(this.event.days);
      this.registers = data.registers;
      this.groupUsers();
    });
    this.groupUsers = () => {
      this.users = __.groupBy(this.registers, 'code');
      __.each(this.users, (user, key) => {
        const userObj = {};
        const data = __.groupBy(user, 'date');
        userObj[key] = {data};
        this.processUser(userObj[key], key);
      });
    };
    this.processUser = (userData, id) => {
      const temp = [];
      __.each(userData.data, (user) => {
        const dates = __.uniq(user, 'event');
        console.log(dates);
        // let current = this.event.days[info.date].blocks.length;
        __.each(dates, (info) => {
          // const size = this.event.days[info.date].blocks.length;
          // for ( let current = 0; current < size; current++ ) {
          //   if(dates[current].hour);
          // }
          // console.log(`${info.code} : ${info.hour}`);
          temp.push({
            code: id,
            date: info.date,
            event: info.event,
            hour: info.hour,
          });
        });
      });
      this.excel.push(temp);
    };
    this.checkTime = (startTime, endTime, timeToCheck) => {
      const check = moment(timeToCheck, 'HH:mm');
      const start = moment(startTime, 'HH:mm');
      const end = moment(endTime, 'HH:mm');
      return check.isBetween(start, end);
    };
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
