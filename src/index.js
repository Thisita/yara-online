import path from 'path';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import boot from './controllers';
// Initialize models
import './models';

// Create express app
const app = express();
// Expose it
export default app;

// Express settings
app.set('view engine', 'jade');

// Set views for error and 404 pages
app.set('views', path.join(__dirname, 'views'));

// Define a custom res.message() method
// which stores messages in the session
app.response.message = function (msg) {
  // Reference 'req.session' via the 'this.req' reference
  let sess = this.req.session;
  // Simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// Set up morgan logging
if (!module.parent) {
  app.use(morgan('dev'));
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve static bootstrap reference
app.use('/css/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

// Session support
app.use(session({
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  secret: 'ChangeMe',
}));

// Parse request bodies (req.body)
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// Expose the "messages" local variable when views are rendered
app.use((req, res, next) => {
  const msgs = req.session.messages || [];

  // Expose "messages" local variable
  res.locals.messages = msgs;

  // Expose "hasMessages"
  res.locals.hasMessages = !!msgs.length;

  next();

  // Empty or "flush" the messages so they don't build up
  req.session.messages = [];
});

// Load controllers
boot(app, { verbose: !module.parent });

app.use((err, req, res, next) => {
  // Log it
  if (!module.parent) {
    console.error(err.stack);
  }

  // Error page
  res.status(500).render('5xx');
});

// Assume 404 since no middleware responded
app.use((req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl });
});

/* istanbull ignore next */
if (!module.parent) {
  // Open listener
  app.listen(8080);
  console.log('yara-online started on port 8080');
}
