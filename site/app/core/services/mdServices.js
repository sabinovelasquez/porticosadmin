export default ngModule => {
  ngModule.service('mdServices', function mdServices($mdSidenav) {
    this.mdSidenav = $mdSidenav;
    this.toggleSidenav = (sideId) => {
      $mdSidenav(`${sideId}`).toggle();
    };
  });
};
