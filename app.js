const express = require('express');

const app = express();
const routes = require('./routes');

module.exports = (config) => {
  const log = config.log();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
  
  app.use('/', routes(config));
  
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return app;
};
