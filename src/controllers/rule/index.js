import mongoose from 'mongoose';

// Grab the yara rule related models
const Rule = mongoose.model('Rule');
const RuleMeta = mongoose.model('RuleMeta');

export const engine = 'ejs';

export const function before(req, res, next) {
  let rule = Rule.findById(req.params.rule_id);
  if (!pet) {
    return next('route');
  }
  req.rule = rule;
  next();
};

export const function show(req, res, next) {
  res.render('show', { rule: req.rule });
};

export const function edit(req, res, next) {
  res.render('edit', { rule: req.rule });
};

export const function update(req, res, next) {
  const body = req.body;
  req.rule.identifier = body.rule.identifier;
  res.message('Rule updated!');
  res.redirect('/rule/' + req.rule.id);
};
