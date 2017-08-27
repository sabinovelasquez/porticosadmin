export default ngModule => {
  ngModule.controller('ViewEventCtrl', function ViewEventCtrl(firebaseAPIService, $stateParams) {
    this.eventKey = $stateParams.key;
    const __ = require('underscore');
    const moment = require('moment');
    this.loading = true;
    this.excel = [];
    this.devices = {};
    this.blocks = [];
    this.bLockNums = [];
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
      __.each(this.event.days, (day, key) => {
        const date = key;
        __.each(day.blocks, (block) => {
          this.blocks.push({date: date, start: block.start, end: block.end});
        });
      });
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
      const finalTemp = [];
      __.each(userData.data, (user) => {
        const dates = __.uniq(user, 'event');
        __.each(dates, (info) => {
          temp.push({
            code: id,
            date: info.date,
            event: info.event,
            hour: info.hour,
          });
        });
      });
      let comp = 0;
      this.bLockNums = [];
      __.each(this.blocks, (block, numKey) => {
        this.bLockNums.push(numKey);
      });
      __.each(this.blocks, (block, key)  => {
        if (temp[key]) {
          finalTemp.push(temp[key]);
          const str = temp[key].event.split(' ');
          const toRem = __.indexOf(this.bLockNums, (str[1] - 1));
          this.bLockNums.splice(toRem, 1);
        } else {
          comp = this.bLockNums[0];
          const toRem = __.indexOf(this.bLockNums, comp);
          this.bLockNums.splice(toRem, 1);
          finalTemp.push({
            code: id,
            date: '-',
            event: `Bloque ${comp + 1}`,
            hour: '-',
          });
        }
      });
      const orderArray = __.sortBy( finalTemp, ( item ) => { return item.event; } );
      this.excel.push(orderArray);
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
