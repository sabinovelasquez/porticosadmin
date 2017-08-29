export default ngModule => {
  require('./nav.scss');

  ngModule.directive('navBar', function navBar(Auth, $state) {
    return {
      template: require('./nav.jade'),
      scope: {},
      controllerAs: 'nav',
      controller: function navCtrl() {
        Auth.$onAuthStateChanged( (data) => {
          this.user = data.email;
        });
        this.logOut = () => {
          Auth.$signOut().then( () => {
            $state.go('login');
          });
        };
      },
    };
  });
};
