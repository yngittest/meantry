'use strict';
(function(){

class ScenarioEditComponent {
  constructor($http, $stateParams, $location) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$location = $location;
  }

  $onInit() {
    var _this = this;
    this.$http.get('/api/scenarios/' + this.$stateParams.id).success(function(scenario) {
       _this.scenario = scenario;
    });
  }

  updateScenario() {
    var _this = this;
    if(this.scenario && this.scenario.id) {
      this.$http.put('/api/scenarios/' + this.$stateParams.id, this.scenario).success(function() {
        _this.$location.path('/scenario');
      });
    }
  }
}

angular.module('meantestApp')
  .component('scenarioEdit', {
    templateUrl: 'app/scenarioEdit/scenarioEdit.html',
    controller: ScenarioEditComponent
  });

})();
