import mongoose from 'mongoose';

// Grab the yara rule related models
const Rule = mongoose.model('Rule');
const RuleMeta = mongoose.model('RuleMeta');

const engine = 'ejs';

function before(req, res, next) {
  const query = Rule.findById(req.params.rule_id);
  query.exec((err, rule) => {
    if (err) {
      return next('route');
    }
    if (!rule) {
      return next(new Error('can\'t find rule'));
    }
    // eslint-disable-next-line no-param-reassign
    req.rule = rule;
    return next();
  });
}

function show(req, res) {
  res.render('show', { rule: req.rule });
}

function edit(req, res) {
  res.render('edit', { rule: req.rule });
}

function update(req, res) {
  const body = req.body;
  // eslint-disable-next-line no-param-reassign
  req.rule.identifier = body.rule.identifier;
  res.message('Rule updated!');
  res.redirect(`/rule/${req.rule.id}`);
}

const RuleController = {
  engine,
  before,
  show,
  edit,
  update,
};

export default RuleController;
