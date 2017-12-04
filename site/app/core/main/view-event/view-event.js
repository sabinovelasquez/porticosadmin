export default ngModule => {
  ngModule.controller('ViewEventCtrl', function ViewEventCtrl(currentAuth, firebaseAPIService, $stateParams) {
    this.eventKey = $stateParams.key;
    const __ = require('underscore');
    const moment = require('moment');
    this.loading = true;
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
          this.blocks.push({start: arr[index].start, end: arr[index].end, date: block[0].date, event: `Bloque ${index + 1}`});
        }
      });
      this.getInfo = (arr, hour) => {
        const block = hour.event;
        let date = moment(new Date(hour.date)).format('DD-MM-YYYY');
        const splitDate = date.split('-');
        date = `${parseInt(splitDate[0], 10)}-${splitDate[1]}-${splitDate[2]}`;
        const filter = __.uniq(arr, 'event');
        let response = '-';
        if (filter) {
          response = __.where(filter, {event: block, date: date});
          if (response[0]) {
            response[0] = {
              where: response[0].where,
              hour: response[0].hour,
              percent: this.timePercent(hour.start, hour.end, response[0].hour),
            };
          }
        }
        return response[0];
      };
      this.users = __.groupBy(registers, 'code');
      __.each(this.users, (user) => {
        const group = __.groupBy(user, 'date');
        const finalGroup = [];
        __.map(group, (innerData) => {
          const arr = __.uniq(innerData, 'event');
          finalGroup.push(arr);
        });
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
