'use strict';

var app = angular.module('todolist', [ 'ui.router', 'ui.bootstrap']);


// Used for configuring the interpolation markup. Defaults to {{ and }}.
app.config(['$interpolateProvider', '$httpProvider', function($interpolateProvider, $httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('poll', {
            url: '/',
            templateUrl: 'static/app/partials/poll.html',
            controller: 'PollController'
        })
        .state('task', {
            url: '/task',
            templateUrl: 'static/app/partials/task.html',
            controller: 'TaskController'
        });
}]);
