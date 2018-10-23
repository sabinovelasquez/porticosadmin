export default ngModule => {
  require('./services/firebaseAPIService')(ngModule);
  require('./services/modal-qr')(ngModule);
};
