export default ngModule => {
  ngModule.controller('ViewEventCtrl', function ViewEventCtrl(currentAuth, firebaseAPIService, $stateParams) {
    this.eventKey = $stateParams.key;
    const __ = require('underscore');
    const moment = require('moment');
    this.loading = true;
    this.excel = {};
    this.preExcel = {};
    this.devices = {};
    this.blocks = [];
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
      const registers = data.registers;
      const days = this.event.days;
      this.eventDates = __.groupBy(days, 'date');
      __.each(this.eventDates, (block) => {
        const arr = block[0].blocks;
        for (let index = 0; index < arr.length; index++) {
          this.blocks.push({start: arr[index].start, end: arr[index].end, date: block[0].date});
        }
      });
      this.getInfo = (arr, hour, index) => {
        const time = moment(this.blocks[index].date, 'DD-MM-YYYY');
        return arr;
      };
      this.users = __.groupBy(registers, 'code');
      __.each(this.users, (user, key) => {
        const group = __.groupBy(user, 'date');
        const finalGroup = [];
        __.map(group, (innerData) => {
          const arr = __.uniq(innerData, 'event');
          finalGroup.push(arr);
        });
        this.preExcel[key] = finalGroup;
      });
    });

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
    this.getPercentageTotal = (user) => {
      let percent = 0;
      __.each(user, (data) => {
        if (data.percent) {
          percent += 100;
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
