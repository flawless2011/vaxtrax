(function() {
    'use strict';
    
    angular.module('main')
        .controller('NavCtrl', ['$scope', '$window', NavController]);
    
        function NavController($scope, $window){
            $scope.isEnabled = false;
            $scope.show = true;
            
            function toggleNav(){
                $scope.show = !$scope.show;
            }
            
            function navigate(location){
                $window.location.assign = '/family';
            }
        }
})();