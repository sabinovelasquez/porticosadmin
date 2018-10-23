export default ngModule => {
  ngModule.controller('ListsCtrl', function ListsCtrl(firebaseAPIService, modalQr) {
    this.eventkey = '';
    this.eventName = '';
    this.usersArr = null;
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
      this.newUserToFB = {
        code: 7,
        firstname: this.newUser.fname,
        lastname: this.newUser.lname,
      };
      firebaseAPIService.storeInvite(this.eventkey, 7).then( (setNewEvent) => {
        setNewEvent.list = this.newUserToFB;
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
      firebaseAPIService.setEventList(this.eventkey).then( (setEvent) => {
        setEvent.list = this.userlist;
        return setEvent.$save();
      });
    };
  });
};
