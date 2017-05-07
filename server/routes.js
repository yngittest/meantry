/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Basic認証
  var basicAuth = require('basic-auth-connect');
  var username = process.env.BASIC_AUTH_USERNAME;
  var password = process.env.BASIC_AUTH_PASSWORD;

  if (username && password) {
    app.use(basicAuth(username, password));
  }

  // Insert routes below
  app.use('/api/scenarios', require('./api/scenario'));
  app.use('/api/things', require('./api/thing'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
