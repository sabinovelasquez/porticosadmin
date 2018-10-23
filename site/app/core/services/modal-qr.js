export default ngModule => {
  ngModule.factory('modalQr', ($uibModal) => {
    const open = (qr, user, eventName) => {
      $uibModal.open({
        animation: true,
        template: require('../main/modals/modalQr.jade'),
        size: 'md',
        controllerAs: 'modalQrCode',
        controller: function modalQrCtrl($uibModalInstance) {
          this.qr = qr;
          this.user = user;
          this.eventName = eventName;
          this.close = () => $uibModalInstance.dismiss();
        },
      });
    };
    const service = {
      open: open,
    };
    return service;
  });
};
