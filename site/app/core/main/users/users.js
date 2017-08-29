export default ngModule => {
  ngModule.controller('UsersCtrl', function UsersCtrl($state, Auth, firebaseAPIService) {
    this.user = {};
    this.loading = false;
    firebaseAPIService.getUsers().then( (data) => {
      this.users = data;
    });
    this.createUser = () => {
      this.loading = true;
      this.error = '';
      Auth.$createUserWithEmailAndPassword(this.user.email, this.user.password).then( (firebaseUser) => {
        this.userCreated = firebaseUser;
        this.loading = false;
        firebaseAPIService.storeUser(firebaseUser.uid, {email: firebaseUser.email});
      }).catch( (error) => {
        this.error = error;
        this.loading = false;
      });
    };
  });
};
