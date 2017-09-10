export default ngModule => {
  require('./sidenav.scss');

  ngModule.directive('sideNav', function sideNav() {
    return {
      template: require('./sidenav.pug'),
      scope: {},
      controllerAs: 'sideNav',
      controller: function sideNavCtrl() {
        this.whiteframe = '1';
        this.menu = [
          {
            title: 'Home',
            uiref: 'main',
            icon: 'home',
          },
          {
            title: 'Dispositivos',
            uiref: 'devices',
            icon: 'android',
          },
          {
            title: 'Usuarios',
            uiref: 'users',
            icon: 'users',
          },
        ];
      },
    };
  });
};
