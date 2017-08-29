export default ngModule => {
  ngModule.controller('LoginCtrl', function LoginCtrl($state, Auth) {
    this.user = {};
    this.loading = false;
    this.login = () => {
      this.loading = true;
      this.error = '';
      Auth.$signInWithEmailAndPassword(this.user.email, this.user.password).then( () => {
        $state.go('main');
      }, (error) => {
        this.error = error;
        this.loading = false;
      });
    };
  });
};
