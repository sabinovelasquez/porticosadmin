export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(mdServices) {
    this.mdServices = mdServices;
  });
};
