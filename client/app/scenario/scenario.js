'use strict';

angular.module('meantestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scenario', {
        url: '/scenario',
        template: '<scenario></scenario>'
      });
  });
