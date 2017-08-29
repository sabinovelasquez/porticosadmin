export default ngModule => {
  ngModule.controller('UsersCtrl', function UsersCtrl($state, Auth) {
    this.user = {};
    this.loading = false;

    this.createUser = () => {
      this.loading = true;
      this.error = '';
      Auth.$createUserWithEmailAndPassword(this.user.email, this.user.password).then( (firebaseUser) => {
        this.userCreated = firebaseUser;
        this.loading = false;
      }).catch( (error) => {
        this.error = error;
        this.loading = false;
      });
    };
  });
};
