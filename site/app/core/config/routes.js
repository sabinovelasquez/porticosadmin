export default ngModule => {
  ngModule.run(
    ($rootScope, $state) => {
      $rootScope.$on('$onAuthStateChanged', (event, toState, toParams, fromState, fromParams, error) => {
        if (error === 'AUTH_REQUIRED') {
          $state.go('login');
        }
      });
    }
  );
  ngModule.config(
    ($stateProvider, $urlRouterProvider) => {
      $urlRouterProvider.otherwise('/login');
      $stateProvider
      .state('login', {
        url: '/login',
        template: require('../main/login/login.jade'),
        controller: 'LoginCtrl',
        controllerAs: 'login',
      })
      .state('main', {
        url: '/main',
        template: require('../main/main.jade'),
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
        template: require('../main/new-event/new-event.jade'),
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
        template: require('../main/edit-event/edit-event.jade'),
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
        template: require('../main/view-event/view-event.jade'),
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
        template: require('../main/devices/devices.jade'),
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
