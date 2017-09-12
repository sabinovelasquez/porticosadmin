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
            desc: 'Descripción',
          },
          {
            title: 'Dispositivos',
            uiref: 'devices',
            icon: 'android',
            desc: 'Descripción',
          },
          {
            title: 'Usuarios',
            uiref: 'users',
            icon: 'users',
            desc: 'Descripción',
          },
        ];
      },
    };
  });
};
