'use strict';

angular.module('meantestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scenarioEdit', {
        url: '/scenario/edit/:id',
        template: '<scenario-edit></scenario-edit>'
      });
  });
