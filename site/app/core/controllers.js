export default ngModule => {
  require('./main/controller')(ngModule);
  require('./main/new-event/new-event')(ngModule);
  require('./main/edit-event/edit-event')(ngModule);
};
