export default ngModule => {
  ngModule.controller('ListsCtrl', function ListsCtrl(firebaseAPIService) {
    firebaseAPIService.getEvents().then( (data) => {
      this.events = data;
      this.eventkey = {};
      this.userlist = {};
      this.upload = () =>{
        firebaseAPIService.setEventList(this.eventkey).then( (setEvent) => {
          setEvent.list = this.userlist;
          return setEvent.$save();
        });
      };
    });
  });
};
