export default ngModule => {
  require('./sidenav.scss');

  ngModule.directive('sideNav', function sideNav() {
    return {
      template: require('./sidenav.pug'),
      scope: {},
      controllerAs: 'sideNav',
      controller: function sideNavCtrl() {
        this.menu = [
          {
            title: 'Home',
            uiref: 'main',
            icon: 'home',
            desc: 'Vista general de Eventos',
          },
          {
            title: 'Dispositivos',
            uiref: 'devices',
            icon: 'android',
            desc: 'Dispositivos con la App instalada',
          },
          {
            title: 'Usuarios',
            uiref: 'users',
            icon: 'contacts',
            desc: 'Lista de usuarios del sistema',
          },
        ];
      },
    };
  });
};
