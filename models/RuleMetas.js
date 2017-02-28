var mongoose = require('mongoose');

var RuleMetaSchema = new mongoose.Schema({
  name: String,
  value: String
});

mongoose.model('RuleMeta', RuleMetaSchema);
