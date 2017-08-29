export default ngModule => {
  require('./main/csvReader/csvReader')(ngModule);
  require('./main/nav/nav')(ngModule);
  require('./main/events/events')(ngModule);
  require('./main/footer/footer')(ngModule);
};
