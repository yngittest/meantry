'use strict';

describe('Component: ScenarioEditComponent', function () {

  // load the controller's module
  beforeEach(module('meantestApp'));

  var ScenarioEditComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ScenarioEditComponent = $componentController('ScenarioEditComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
