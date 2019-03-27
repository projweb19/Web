var ngBingMaps = angular.module('ngBingMaps', []);
ngBingMaps.controller('MainCtrl', function ($scope) {


    $scope.center = [48.85, 2.34];



    $scope.onPushpinClick = function (pin) {
        alert(pin.color + ' pin clicked');
    };
});
