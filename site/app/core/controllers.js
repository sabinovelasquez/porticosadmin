export default ngModule => {
  require('./main/controller')(ngModule);
  require('./main/new-event/new-event')(ngModule);
  require('./main/edit-event/edit-event')(ngModule);
  require('./main/view-event/view-event')(ngModule);
  require('./main/devices/devices')(ngModule);
  require('./main/login/login')(ngModule);
};
