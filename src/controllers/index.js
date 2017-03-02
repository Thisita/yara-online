import path from 'path';
import express from 'express';
import rule from './rule';

const controllers = [
  rule,
];

function boot(parent, options) {
  const verbose = options.verbose || false;
  const app = express();
  let name;
  let prefix;
  let handler;
  let method;
  let http_path;

  for(let controller in controllers) {
    name = controller.name;
    prefix = controller.prefix || '';
    // Allow specifying the view engine
    if(controller.engine) {
      app.set('view engine', controller.engine);
    }
    app.set('views', path.join(path.join(__dirname, 'views/'), name));

    // Generate routes based on exported methods
    for (let key in controller) {
      if (!['name', 'prefix', 'engine', 'before'].includes(key)) {
        switch (key) {
          case 'show':
            method = 'get';
            http_path = `/${name}/:${name}_id`;
            break;
          case 'list':
            method = 'get';
            http_path = `/${name}s`;
            break;
          case 'edit':
            method = 'get';
            http_path = `/${name}/:${name}_id/edit`;
            break;
          case 'update':
            method = 'put';
            http_path = `/${name}/:${name}_id`;
            break;
          case 'create':
            method = 'post';
            http_path = `/${name}`;
            break;
          case 'index':
            method = 'get';
            http_path = '/';
            break;
          default:
            /* istanbul ignore next */
            throw new Error(`unrecognized route: ${name}.${key}`);
        }

        // Setup
        handler = controller[key];
        path = prefix + http_path;

        // before middleware support
        if (controller.before) {
          app[method](http_path, controller.before, handler);
          verbose && console.log('\t%s %s -> before -> %s', method.toUpperCase(), http_path, key);
        } else {
          app[method](http_path, handler);
          verbose && console.log('\t%s %s -> %s', method.toUpperCase(), http_path, key);
        }

        // Mount the app
        parent.use(app);
      }
    }
  }
}

export default boot;
