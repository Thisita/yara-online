import mongoose from 'mongoose';

// Define schema
const RuleSchema = new mongoose.Schema({
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

// Expose schema
mongoose.model('Rule', RuleSchema);
