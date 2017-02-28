import mongoose from 'mongoose';

// Define schema
const RuleMetaSchema = new mongoose.Schema({
  name: String,
  value: String
});

// Expose schema
mongoose.model('RuleMeta', RuleMetaSchema);
