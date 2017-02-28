var mongoose = require('mongoose');

var RuleSchema = new mongoose.Schema({
  imports: [String],
  identifier: String,
  visibility: {type: String, default: 'public'},
  tags: [String],
  meta: [{type: mongoose.Schema.Types.ObjectId, ref: 'RuleMeta'}],
  strings: [String],
  condition: String,
  comments: [String],
  references: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rule'}],
  raw: String
});

mongoose.model('Rule', RuleSchema);
