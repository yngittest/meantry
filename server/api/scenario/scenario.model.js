'use strict';

import mongoose from 'mongoose';

var ScenarioSchema = new mongoose.Schema({
  id: String,
  type: String,
  robot1: String,
  robot2: String
});

export default mongoose.model('Scenario', ScenarioSchema);
