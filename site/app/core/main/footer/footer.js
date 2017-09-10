export default ngModule => {
  require('./footer.scss');

  ngModule.directive('mainFooter', function mainFooter() {
    return {
      template: require('./footer.pug'),
    };
  });
};
