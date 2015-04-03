'use strict';
angular
    .module('vtApp', ['ngMaterial', 'ngRoute', 'main', 'home', 'users'])
    .config(function($mdThemingProvider, $mdIconProvider, $routeProvider){
        $mdIconProvider
            .icon("menu", "./assets/svg/menu.svg", 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('orange')
            .accentPalette('indigo');
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });