var phonecatApp = angular.module('myApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('myController', function PhoneListController($scope) {
  console.log('myController');
  $scope.ngUser = {
    firstName: 'John',
    lastName: 'Doe'
  };
});
