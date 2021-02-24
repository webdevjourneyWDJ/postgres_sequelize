const express = require('express');

const app = express();
const routes = require('./routes');

const TodoService = require('./services/TodoService');
const UserService = require('./services/UserService');

module.exports = (config) => {
  const log = config.log();

  const todoService = new TodoService();
  const userService = new UserService();

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
  
  app.use('/', routes({todoService, userService}));
  
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
