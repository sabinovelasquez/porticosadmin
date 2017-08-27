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
      __.each(this.blocks, (block, key)  => {
        orderArray[key].percent = this.timePercent(block.start, block.end, orderArray[key].hour);
      });
      this.excel.push(orderArray);
    };
    this.timePercent = (startTime, endTime, timeToCheck) => {
      const check = moment(timeToCheck, 'HH:mm');
      const start = moment(startTime, 'HH:mm');
      const end = moment(endTime, 'HH:mm');
      let percent = (check - start) / (end - start) * 100;
      percent = (100 - percent);
      if (percent > 100) {
        percent = 100;
      }
      if (percent < 0) {
        percent = 0;
      }
      if ( !isNaN(percent) ) {
        return percent;
      }
    };
    this.getPercentage = (user) => {
      let percent = 0;
      __.each(user, (data) => {
        if (data.percent) {
          percent += data.percent;
        }
      });
      return (percent / user.length);
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
