export default ngModule => {
  ngModule.controller('ListsCtrl', function ListsCtrl(firebaseAPIService, modalQr) {
    this.eventkey = '';
    this.eventName = '';
    this.usersArr = null;
    this.uploaded = false;
    this.alerts = [];
    this.closeAlert = (index) => {
      this.alerts.splice(index, 1);
    };
    firebaseAPIService.getEvents().then( (data) => {
      this.events = data;
    });
    this.generateQR = (item) => {
      const eventN = this.eventName;
      const nameArr = eventN.split(' ');
      let nameCoded = '';
      for (let dim = 0; dim < nameArr.length; dim++) {
        nameCoded += nameArr[dim][0].toUpperCase();
      }
      const encodedQR = `${nameCoded}_${item.code}_${item.firstname}${item.lastname}`;
      this.qr = `https://chart.googleapis.com/chart?cht=qr&chl=${encodedQR}&chs=180x180&chld=L|0`;
      modalQr.open(this.qr, item, this.eventName);
      this.loadedUsers = null;
    };
    this.newInvite = () => {
      let lastNum = 0;
      let optionalcargo = '';
      if (this.events[this.eventkey].list) {
        lastNum = this.events[this.eventkey].list.length;
      }
      if (this.newUser.cargo) {
        optionalcargo = this.newUser.cargo;
      }
      this.newUserToFB = {
        code: lastNum,
        firstname: this.newUser.fname,
        lastname: this.newUser.lname,
        cargo: optionalcargo,
      };
      firebaseAPIService.storeInvite(this.eventkey).then( (setNewEvent) => {
        setNewEvent[lastNum] = this.newUserToFB;
        this.generateQR(setNewEvent[lastNum]);
        this.getUsers();
        this.alerts.push({ type: 'success', msg: 'Usuario almacenado con éxito', timer: 10000 });
        return setNewEvent.$save();
      });
    };
    this.getUsers = () => {
      this.usersArr = null;
      firebaseAPIService.getEvent(this.eventkey).then( (event) => {
        this.eventName = event.title;
        this.usersArr = Object.values(event.list);
      });
    };
    this.upload = () => {
      this.uploadLoading = true;
      firebaseAPIService.setEventList(this.eventkey).then( (setEvent) => {
        setEvent.list = this.userlist;
        this.uploaded = true;
        this.uploadLoading = false;
        this.getUsers();
        this.alerts.push({ type: 'success', msg: 'Lista cargada con éxito', timer: 5000 });
        return setEvent.$save();
      });
    };
  });
};
