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
    ($stateProvider, $urlRouterProvider) => {
      $urlRouterProvider.otherwise('/login');
      $stateProvider
      .state('login', {
        url: '/login',
        template: require('../main/login/login.jade'),
        controller: 'LoginCtrl',
        controllerAs: 'login',
      })
      .state('users', {
        url: '/users',
        template: require('../main/users/users.jade'),
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
      })
      .state('lists', {
        url: '/lists',
        template: require('../main/lists/lists.jade'),
        controller: 'ListsCtrl',
        controllerAs: 'lists',
        resolve: {
          currentAuth: (Auth) => {
            return Auth.$requireSignIn();
          },
        },
      });
    }
  );
};
