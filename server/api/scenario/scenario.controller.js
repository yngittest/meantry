/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/scenarios              ->  index
 * POST    /api/scenarios              ->  create
 * GET     /api/scenarios/:id          ->  show
 * PUT     /api/scenarios/:id          ->  update
 * DELETE  /api/scenarios/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Scenario from './scenario.model';

// 初期データ追加
Scenario.find({}).remove(function() {
  Scenario.create({
    id: 'gen-11',
    type: '1round-any'
  }, {
    id: 'gen-12',
    type: '1round-any'
  }, function(err) {
    console.log('finished populating Scenarios');
  });
});

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Scenarios
export function index(req, res) {
  return Scenario.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Scenario from the DB
export function show(req, res) {
  return Scenario.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Scenario in the DB
export function create(req, res) {
  return Scenario.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Scenario in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Scenario.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Scenario from the DB
export function destroy(req, res) {
  return Scenario.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
