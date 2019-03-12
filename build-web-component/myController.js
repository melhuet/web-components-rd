var phonecatApp = angular.module('myApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('myController', function PhoneListController($scope) {
  $scope.names = ['John', 'Mel', 'Benj'];
  $scope.firstName = $scope.names[0];

  $scope.user = {
    firstName: 'John',
    lastName: 'Doe',
    adress: {
      country: 'France',
      city: 'Grenoble'
    }
  };
});
