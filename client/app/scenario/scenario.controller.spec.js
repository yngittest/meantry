'use strict';

describe('Component: ScenarioComponent', function () {

  // load the controller's module
  beforeEach(module('meantestApp'));

  var ScenarioComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ScenarioComponent = $componentController('ScenarioComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
