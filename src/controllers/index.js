import path from 'path';
import express from 'express';
import rule from './rule';

const controllers = [
  rule,
];

function boot(parent) {
  const app = express();
  let name;
  let prefix;
  let handler;
  let method;
  let httpPath;

  controllers.forEach((controller) => {
    name = controller.name;
    prefix = controller.prefix || '';
    // Allow specifying the view engine
    if (controller.engine) {
      app.set('view engine', controller.engine);
    }
    app.set('views', path.join(path.join(__dirname, 'views/'), name));

    // Generate routes based on exported methods
    Object.keys(controller).forEach((key) => {
      if (!['name', 'prefix', 'engine', 'before'].includes(key)) {
        switch (key) {
          case 'show':
            method = 'get';
            httpPath = `/${name}/:${name}_id`;
            break;
          case 'list':
            method = 'get';
            httpPath = `/${name}s`;
            break;
          case 'edit':
            method = 'get';
            httpPath = `/${name}/:${name}_id/edit`;
            break;
          case 'update':
            method = 'put';
            httpPath = `/${name}/:${name}_id`;
            break;
          case 'create':
            method = 'post';
            httpPath = `/${name}`;
            break;
          case 'index':
            method = 'get';
            httpPath = '/';
            break;
          default:
            /* istanbul ignore next */
            throw new Error(`unrecognized route: ${name}.${key}`);
        }

        // Setup
        handler = controller[key];
        path = prefix + httpPath;

        // before middleware support
        if (controller.before) {
          app[method](httpPath, controller.before, handler);
        } else {
          app[method](httpPath, handler);
        }

        // Mount the app
        parent.use(app);
      }
    });
  });
}

export default boot;
