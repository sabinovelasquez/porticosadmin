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
            let count = 0;
            const reader = new FileReader();
            reader.onload = (event) => {
              const users = {};
              const contents = event.target.result;
              const usersCsv = contents.split('\n');
              __.each(usersCsv, (user) => {
                let arr = user.split(';');
                arr = user.split(',');
                let code = arr[0];
                const firstname = arr[1];
                const lastname = arr[2];
                if (!code) {
                  code = count;
                  count++;
                }
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
