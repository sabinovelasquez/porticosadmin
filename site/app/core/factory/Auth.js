export default ngModule => {
  ngModule.service('Auth', ($firebaseAuth) => {
    return $firebaseAuth();
  });
};
