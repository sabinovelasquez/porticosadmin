export default ngModule => {
  ngModule.directive('fileReader', function fileReader() {
    const __ = require('underscore');
    return {
      scope: {
        fileReader: '=',
      },
      link: (scope, element) => {
        element.on('change', (changeEvent) => {
          const files = changeEvent.target.files;
          if (files.length) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const users = {};
              const contents = event.target.result;
              const usersCsv = contents.split('\n');
              __.each(usersCsv, (user) => {
                const arr = user.split(';');
                const code = arr[0];
                const firstname = arr[1];
                const lastname = arr[2];
                users[code] = {firstname: firstname, lastname: lastname};
              });
              scope.$apply( () => {
                scope.fileReader = users;
              });
            };
            reader.readAsText(files[0]);
          }
        });
      },
    };
  });
};
