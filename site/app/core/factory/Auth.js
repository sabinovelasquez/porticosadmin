export default ngModule => {
  ngModule.service('Auth', ($firebaseAuth) => {
    const firebase = require('firebase');
    return $firebaseAuth(firebase.auth());
  });
};
