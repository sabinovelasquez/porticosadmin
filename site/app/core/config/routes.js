export default ngModule => {
  ngModule.run(
    (Auth, $state) => {
      Auth.$onAuthStateChanged( (data) => {
        if (!data) {
          $state.go('login');
        }
      });
    }
  );
  ngModule.config(
    ($stateProvider, $urlRouterProvider, $mdThemingProvider) => {
      $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('indigo');
      $urlRouterProvider.otherwise('/login');
      $stateProvider
      .state('login', {
        url: '/login',
        template: require('../main/login/login.pug'),
        controller: 'LoginCtrl',
        controllerAs: 'login',
      })
      .state('users', {
        url: '/users',
        template: require('../main/users/users.pug'),
        controller: 'UsersCtrl',
        controllerAs: 'users',
        resolve: {
          currentAuth: (Auth) => {
            return Auth.$requireSignIn();
          },
        },
      })
      .state('main', {
        url: '/main',
        template: require('../main/main/main.pug'),
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          currentAuth: (Auth) => {
            return Auth.$requireSignIn();
          },
        },
      })
      .state('new-event', {
        url: '/new-event',
        template: require('../main/new-event/new-event.pug'),
        controller: 'NewEventCtrl',
        controllerAs: 'newEvent',
        resolve: {
          currentAuth: (Auth) => {
            return Auth.$requireSignIn();
          },
        },
      })
      .state('edit-event', {
        url: '/edit-event/:key',
        template: require('../main/edit-event/edit-event.pug'),
        controller: 'EditEventCtrl',
        controllerAs: 'editEvent',
        resolve: {
          currentAuth: (Auth) => {
            return Auth.$requireSignIn();
          },
        },
      })
      .state('view-event', {
        url: '/view-event/:key',
        template: require('../main/view-event/view-event.pug'),
        controller: 'ViewEventCtrl',
        controllerAs: 'viewEvent',
        resolve: {
          currentAuth: (Auth) => {
            return Auth.$requireSignIn();
          },
        },
      })
      .state('devices', {
        url: '/devices',
        template: require('../main/devices/devices.pug'),
        controller: 'DevicesCtrl',
        controllerAs: 'devices',
        resolve: {
          currentAuth: (Auth) => {
            return Auth.$requireSignIn();
          },
        },
      });
    }
  );
};
