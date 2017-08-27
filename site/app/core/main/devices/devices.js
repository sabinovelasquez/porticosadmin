export default ngModule => {
  ngModule.controller('DevicesCtrl', function DevicesCtrl(firebaseAPIService) {
    const __ = require('underscore');
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
    this.getBlocks = (eventKey) => {
      const arr = [];
      let size = 0;
      __.map(this.events[eventKey].days, (item) => {
        size += __.size(item.blocks);
      });
      for (let current = 0; current < size; current++) {
        arr.push(current + 1);
      }
      return arr;
    };
    // this.getHour = (eventKey, block) => {
    //   const arr = [];
    //   const comp = block.split(' ');
    //   __.each(this.events[eventKey].days, (data) => {
    //     __.each(data.blocks, (info) => {
    //       arr.push(info);
    //     });
    //   });
    //   console.log(arr[(comp[1] - 1)]);
    // };
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
