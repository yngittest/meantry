'use strict';
(function(){

class ScenarioComponent {
  constructor($http, socket) {
    this.$http = $http
    this.socket = socket
    this.scenarios = [];
  }

  $onInit() {
    var _this = this
    this.$http.get('/api/scenarios').success(function(scenarios) {
       _this.scenarios = scenarios;
       _this.socket.syncUpdates('scenario', _this.scenarios);
    });
  }

  createScenario() {
    var _this = this
    if(this.scenario && this.scenario.id) {
      this.$http.post('/api/scenarios', this.scenario).success(function() {
        _this.scenario.id = '';
        _this.scenario.type = '';
        _this.scenario.robot1 = '';
        _this.scenario.robot2 = '';
      });
    }
  }

  deleteScenario(scenario) {
    this.$http.delete('/api/scenarios/' + scenario._id);
  }
}

angular.module('meantestApp')
  .component('scenario', {
    templateUrl: 'app/scenario/scenario.html',
    controller: ScenarioComponent
  });

})();
