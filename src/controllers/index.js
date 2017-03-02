import express from 'express';
import rule from './rule';

const controllers = [
  rule
];

function boot(parent, options) {
  const verbose = options.verbose || false;
  let app = express();
  let name;
  let prefix;
  let handler;
  let method;
  let path;

  for(let controller in controllers) {
    name = controller.name;
    prefix = controller.prefix || '';
    // Allow specifying the view engine
    if(controller.engine) {
      app.set('view engine', controller.engine);
    }
    app.set('views', __dirname + 'views/' + name);

    // Generate routes based on exported methods
    for(let key in controller) {
      if(~['name', 'prefix', 'engine', 'before'].indexOf(key)) {
        continue;
      }
      switch(key) {
        case 'show':
          method = 'get';
          path = '/' + name + '/:' + name + '_id';
          break;
        case 'list':
          method = 'get';
          path = '/' + name + 's';
          break;
        case 'edit':
          method = 'get';
          path = '/' + name + '/:' + name + '_id/edit';
          break;
        case 'update':
          method = 'put';
          path = '/' + name + '/:' + name + '_id';
          break;
        case 'create':
          method = 'post';
          path = '/' + name;
          break;
        case 'index':
          method = 'get';
          path = '/';
          break;
        default:
          /* istanbul ignore next */
          throw new Error('unrecognized route: ' + name + '.' + key);
      }

      // Setup
      handler = controller[key];
      path = prefix + path;

      // before middleware support
      if(controller.before) {
        app[method](path, controller.before, handler);
        verbose && console.log('\t%s %s -> before -> %s', method.toUpperCase(), path, key);
      } else {
        app[method](path, handler);
        verbose && console.log('\t%s %s -> %s', method.toUpperCase(), path, key);
      }

      // Mount the app
      parent.use(app);
    }
  }
}

export default boot;
