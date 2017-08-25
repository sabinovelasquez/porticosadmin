export default ngModule => {
  ngModule.controller('ViewEventCtrl', function ViewEventCtrl(firebaseAPIService, $stateParams) {
    this.eventKey = $stateParams.key;
    const __ = require('underscore');
    this.loading = true;
    this.excel = [];
    this.devices = {};
    this.headers = ['Código', 'Fecha', 'Bloque', 'Hora', 'Sala'];
    firebaseAPIService.getEvent(this.eventKey).then( (data) => {
      this.event = data;
      __.each(data.registers, (user) => {
        this.excel.push(user);
      });
    });
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
