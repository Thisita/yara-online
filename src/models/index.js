import mongoose from 'mongoose';
import './Rules';
import './RuleMetas';

// Open connection to mongodb
mongoose.connect('mongodb://localhost/yara');
